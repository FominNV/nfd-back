import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiEntityPath, ApiKeyHeader } from "common/headers";
import { Roles } from "decorators/roles-auth.decorator";
import { RolesGuard } from "../../guards/roles.guard";
import { City } from "./cities.model";
import { CitiesService } from "./cities.service";
import { CreateCityDTO } from "./dto/create-city.dto";
import { UserRolesType } from "entities/users/users.types";

@ApiTags("Table-city")
@Controller(ApiEntityPath + "/city")
export class CitiesController {
  constructor(private cityService: CitiesService) {}

  @ApiOperation({ summary: "Create city" })
  @ApiResponse({ status: 200, type: City })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() cityDTO: CreateCityDTO) {
    return this.cityService.createCity(cityDTO);
  }

  @ApiOperation({ summary: "Get all cities" })
  @ApiResponse({ status: 200, type: City })
  @ApiHeader(ApiKeyHeader)
  @Get()
  getAll() {
    return this.cityService.getAllCities();
  }

  @ApiOperation({ summary: "Get one city" })
  @ApiResponse({ status: 200, type: City })
  @ApiHeader(ApiKeyHeader)
  @Get("/:id")
  getOne(@Param("id") id: number) {
    return this.cityService.getCityById(id);
  }

  @ApiOperation({ summary: "Update city" })
  @ApiResponse({ status: 200, type: City })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Put("/:id")
  update(@Param("id") id: number, @Body() cityDTO: CreateCityDTO) {
    return this.cityService.updateCity(id, cityDTO);
  }

  @ApiOperation({ summary: "Delete city" })
  @ApiResponse({ status: 200, type: City })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.cityService.deleteCity(id);
  }
}
