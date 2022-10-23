import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../decorators/roles-auth.decorator";
import { RolesGuard } from "../../guards/roles.guard";
import { Car } from "./cars.model";
import { CarsService } from "./cars.service";
import { CreateCarDTO } from "./dto/create-cars.dto";
import { ApiEntityPath, ApiKeyHeader } from "common/headers";
import { IQueryParams } from "common/types";
import { UserRolesType } from "entities/users/users.types";

@ApiTags("Table-car")
@Controller(ApiEntityPath + "/car")
export class CarsController {
  constructor(private carService: CarsService) {}

  @ApiOperation({ summary: "Create car" })
  @ApiResponse({ status: 200, type: Car })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() carDTO: CreateCarDTO) {
    return this.carService.createCar(carDTO);
  }

  @ApiOperation({ summary: "Get all cars" })
  @ApiResponse({ status: 200, type: Car })
  @ApiHeader(ApiKeyHeader)
  @Get()
  getAll(@Query() params: IQueryParams) {
    return this.carService.getAllCars(params);
  }

  @ApiOperation({ summary: "Get one car" })
  @ApiResponse({ status: 200, type: Car })
  @ApiHeader(ApiKeyHeader)
  @Get("/:id")
  getOne(@Param("id") id: number) {
    return this.carService.getCarById(id);
  }

  @ApiOperation({ summary: "Update car" })
  @ApiResponse({ status: 200, type: Car })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Put("/:id")
  update(@Param("id") id: number, @Body() carDTO: CreateCarDTO) {
    return this.carService.updateCar(id, carDTO);
  }

  @ApiOperation({ summary: "Delete car" })
  @ApiResponse({ status: 200, type: Car })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.carService.deleteCar(id);
  }
}
