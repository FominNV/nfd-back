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
import { OrderStatus } from "./order-statuses.model";
import { OrderStatusesService } from "./order-statuses.service";
import { ApiEntityPath, ApiKeyHeader } from "common/headers";
import { CreateOrderStatusDTO } from "./dto/create-order-statuses";
import { UserRolesType } from "entities/users/users.types";

@ApiTags("Table-order-statuses")
@Controller(ApiEntityPath + "/orderStatus")
export class OrderStatusesController {
  constructor(private orderStatusService: OrderStatusesService) {}

  @ApiOperation({ summary: "Create status of order" })
  @ApiResponse({ status: 200, type: OrderStatus })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() pointDTO: CreateOrderStatusDTO) {
    return this.orderStatusService.createOrderStatus(pointDTO);
  }

  @ApiOperation({ summary: "Get all statuses of order" })
  @ApiResponse({ status: 200, type: OrderStatus })
  @ApiHeader(ApiKeyHeader)
  @Get()
  getAll() {
    return this.orderStatusService.getAllOrderStatuses();
  }

  @ApiOperation({ summary: "Get one status of order" })
  @ApiResponse({ status: 200, type: OrderStatus })
  @ApiHeader(ApiKeyHeader)
  @Get("/:id")
  getOne(@Param("id") id: number) {
    return this.orderStatusService.getOrderStatusById(id);
  }

  @ApiOperation({ summary: "Update status of order" })
  @ApiResponse({ status: 200, type: OrderStatus })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Put("/:id")
  update(@Param("id") id: number, @Body() pointDTO: CreateOrderStatusDTO) {
    return this.orderStatusService.updateOrderStatus(id, pointDTO);
  }

  @ApiOperation({ summary: "Delete point" })
  @ApiResponse({ status: 200, type: OrderStatus })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.orderStatusService.deleteOrderStatus(id);
  }
}
