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
import { RatesService } from "./rates.service";
import { CreateRateDTO } from "./dto/create-rates.dto";
import { ApiEntityPath, ApiKeyHeader } from "common/headers";
import { Rate } from "./rates.model";
import { UserRolesType } from "entities/users/users.types";

@ApiTags("Table-rate")
@Controller(ApiEntityPath + "/rate")
export class RatesController {
  constructor(private rateService: RatesService) {}

  @ApiOperation({ summary: "Create rate" })
  @ApiResponse({ status: 200, type: Rate })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() rateDTO: CreateRateDTO) {
    return this.rateService.createRate(rateDTO);
  }

  @ApiOperation({ summary: "Get all rates" })
  @ApiResponse({ status: 200, type: Rate })
  @ApiHeader(ApiKeyHeader)
  @Get()
  getAll() {
    return this.rateService.getAllRates();
  }

  @ApiOperation({ summary: "Get one rate" })
  @ApiResponse({ status: 200, type: Rate })
  @ApiHeader(ApiKeyHeader)
  @Get("/:id")
  getOne(@Param("id") id: number) {
    return this.rateService.getRateById(id);
  }

  @ApiOperation({ summary: "Update rate" })
  @ApiResponse({ status: 200, type: Rate })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Put("/:id")
  update(@Param("id") id: number, @Body() rateDTO: CreateRateDTO) {
    return this.rateService.updateRate(id, rateDTO);
  }

  @ApiOperation({ summary: "Delete rate" })
  @ApiResponse({ status: 200, type: Rate })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.rateService.deleteRate(id);
  }
}
