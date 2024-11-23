import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEnvironment(): object {
    return {
      service: 'Food And Beverage Service',
      environment: process.env.environment,
    };
  }
}
