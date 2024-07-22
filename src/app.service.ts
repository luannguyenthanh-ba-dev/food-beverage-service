import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEnviroment(): object {
    return {
      environment: process.env.environment,
    };
  }
}
