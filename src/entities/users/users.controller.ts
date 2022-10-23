import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "guards/roles.guard";
import { Roles } from "decorators/roles-auth.decorator";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateUserDTO } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";
import { UserRolesType } from "./users.types";
import { ApiEntityPath } from "common/headers";

@ApiTags("Users")
@Controller(ApiEntityPath + "/user")
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDTO: CreateUserDTO) {
    return this.userService.createUser(userDTO);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: "Set role" })
  @ApiResponse({ status: 200 })
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: "Bab user" })
  @ApiResponse({ status: 200 })
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Post("/ban")
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
