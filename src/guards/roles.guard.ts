import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const basic = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (basic !== "Basic" || !token) {
        throw new UnauthorizedException({
          message: "User is unauthorized",
        });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (e) {
      if (e.message === "User is unauthorized") {
        throw new HttpException(
          "User is unauthorized",
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException("No access", HttpStatus.FORBIDDEN);
    }
  }
}
