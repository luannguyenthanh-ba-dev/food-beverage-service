import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CrossInternalServicesHttpRequest, Methods } from 'src/common/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger();
  private readonly internalServiceAPIKey = process.env.INTERNAL_SERVICE_API_KEY;
  private readonly userService = process.env.USER_SERVICE;

  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log(
      `Request to route: ${context.getClass().name}.${context.getHandler().name}`,
    );
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    const apiKey = request.headers['api-key'];
    // Note: When we use internal API Key we must accept cross call all feature and pass the role guard too!
    if (apiKey) {
      if (apiKey !== this.internalServiceAPIKey) {
        this.logger.error(
          'ERROR from AuthGuard: Unauthorized for internal service calling!',
        );
        throw new UnauthorizedException(
          'ERROR: Unauthorized for internal service calling!',
        );
      }
      return true;
    }

    if (!token) {
      this.logger.error('ERROR from AuthGuard: Not have user token!');
      throw new ForbiddenException('ERROR: Not have user token!');
    }

    let user;
    // Validate request token:
    try {
      user = await CrossInternalServicesHttpRequest(
        Methods.post,
        `${this.userService}/v1/auth/introspections`,
        {
          headers: {
            authorization: token,
          },
        },
      );
    } catch (error) {
      this.logger.error(
        `ERROR from AuthGuard: Call to user service met error - ${error.message}`,
      );
      throw new ForbiddenException('Error: Unauthorized user token!');
    }

    if (!user || !user.email) {
      throw new ForbiddenException('Error: Not have user!');
    }

    request.user = user;
    return true;
  }
}
