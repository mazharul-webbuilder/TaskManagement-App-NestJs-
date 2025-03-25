import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void): any {
    console.log(`Request... ${req.method} ${req.originalUrl}`);
    next(); // Call next() to continue the request-response cycle
  }
}
