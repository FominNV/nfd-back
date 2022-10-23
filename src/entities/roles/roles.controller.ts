import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { RolesGuard } from "guards/roles.guard";
import { CreateRoleDTO } from "./dto/create-role.dto";
import { RolesService } from "./roles.service";

@Controller("roles")
export class RolesController {
  constructor (private roleService: RolesService) {}

  @Post()
  create (@Body() dto: CreateRoleDTO) {
    return this.roleService.createRole(dto);
  }

  @Get("/:value")
  @UseGuards(RolesGuard)
  getByValue (@Param("value") value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
