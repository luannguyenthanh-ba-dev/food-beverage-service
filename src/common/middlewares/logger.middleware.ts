import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`API ${req.path} is called from ${req.ip}`);
    next();
  }
}
