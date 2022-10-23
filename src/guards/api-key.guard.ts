import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate (
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const headers = req.headers;

      if (
        headers["x-api-factory-application-id"] !== process.env.X_API_FACTORY_APPLICATION_ID
      ) {
        throw new HttpException("Invalid API key", HttpStatus.BAD_REQUEST);
      }

      return true;
    } catch (e) {
      throw new HttpException(
        "Invalid API key", HttpStatus.BAD_REQUEST,
      );
    }
  }
}
