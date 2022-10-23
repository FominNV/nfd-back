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
import { RateType } from "./rate-types.model";
import { RateTypesService } from "./rate-types.service";
import { CreateRateTypeDTO } from "./dto/create-rate-types.dto";
import { ApiEntityPath, ApiKeyHeader } from "common/headers";
import { UserRolesType } from "entities/users/users.types";

@ApiTags("Table-rate_type")
@Controller(ApiEntityPath + "/rateType")
export class RateTypesController {
  constructor(private rateTypeService: RateTypesService) {}

  @ApiOperation({ summary: "Create types of rate" })
  @ApiHeader(() => ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() rateTypeDTO: CreateRateTypeDTO) {
    return this.rateTypeService.createRateType(rateTypeDTO);
  }

  @ApiOperation({ summary: "Get all types of rate" })
  @ApiResponse({ status: 200, type: RateType })
  @ApiHeader(ApiKeyHeader)
  @Get()
  getAll() {
    return this.rateTypeService.getAllRateTypes();
  }

  @ApiOperation({ summary: "Get one type of rate" })
  @ApiResponse({ status: 200, type: RateType })
  @ApiHeader(ApiKeyHeader)
  @Get("/:id")
  getOne(@Param("id") id: number) {
    return this.rateTypeService.getRateTypeById(id);
  }

  @ApiOperation({ summary: "Update type of rate" })
  @ApiResponse({ status: 200, type: RateType })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Put("/:id")
  update(@Param("id") id: number, @Body() rateTypeDTO: CreateRateTypeDTO) {
    return this.rateTypeService.updateRateType(id, rateTypeDTO);
  }

  @ApiOperation({ summary: "Delete type of rate" })
  @ApiResponse({ status: 200, type: RateType })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.rateTypeService.deleteRateType(id);
  }
}
