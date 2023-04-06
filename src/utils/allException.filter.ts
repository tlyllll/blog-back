import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as moment from 'moment';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const { message, code } = exception.getResponse() as any;
    response.status(status).json({
      code: code || status,
      timestamp: moment().format('yyyy-MM-DD HH:mm:ss'),
      path: request.url,
      error: 'Bad Request',
      message,
    });
  }
}
