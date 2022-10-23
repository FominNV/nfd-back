import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { Role } from "entities/roles/roles.model";
import { UserRoles } from "entities/roles/user-roles.model";
import { RolesModule } from "entities/roles/roles.module";
import { AuthModule } from "entities/auth/auth.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
