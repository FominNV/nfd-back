import { Module, forwardRef } from "@nestjs/common";
import { UsersModule } from "entities/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: {
        expiresIn: "168h",
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
