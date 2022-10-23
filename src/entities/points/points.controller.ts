import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "decorators/roles-auth.decorator";
import { RolesGuard } from "guards/roles.guard";
import { Point } from "./points.model";
import { PointsService } from "./points.service";
import { CreatePointDTO } from "./dto/create-point.dto";
import { ApiEntityPath, ApiKeyHeader } from "common/headers";
import { UserRolesType } from "entities/users/users.types";

@ApiTags("Table-point")
@Controller(ApiEntityPath + "/point")
export class PointsController {
  constructor(private pointService: PointsService) {}

  @ApiOperation({ summary: "Create point" })
  @ApiResponse({ status: 200, type: Point })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() pointDTO: CreatePointDTO) {
    return this.pointService.createPoint(pointDTO);
  }

  @ApiOperation({ summary: "Get all points" })
  @ApiResponse({ status: 200, type: Point })
  @ApiHeader(ApiKeyHeader)
  @Get()
  getAll() {
    return this.pointService.getAllPoints();
  }

  @ApiOperation({ summary: "Get one point" })
  @ApiResponse({ status: 200, type: Point })
  @ApiHeader(ApiKeyHeader)
  @Get("/:id")
  getOne(@Param("id") id: number) {
    return this.pointService.getPointById(id);
  }

  @ApiOperation({ summary: "Update point" })
  @ApiResponse({ status: 200, type: Point })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Put("/:id")
  update(@Param("id") id: number, @Body() pointDTO: CreatePointDTO) {
    return this.pointService.updatePoint(id, pointDTO);
  }

  @ApiOperation({ summary: "Delete point" })
  @ApiResponse({ status: 200, type: Point })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.pointService.deletePoint(id);
  }
}
