import { RolesService } from "./roles.service";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./roles.model";
import { User } from "entities/users/users.model";
import { UserRoles } from "./user-roles.model";
import { RolesController } from "./roles.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles]), JwtModule],
  exports: [RolesService],
})
export class RolesModule {}
