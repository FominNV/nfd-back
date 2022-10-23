import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Query,
} from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "decorators/roles-auth.decorator";
import { RolesGuard } from "guards/roles.guard";
import { Order } from "./orders.model";
import { OrdersService } from "./orders.service";
import { CreateOrderDTO } from "./dto/create-orders.dto";
import { ApiEntityPath, ApiKeyHeader } from "common/headers";
import { OrderCreationAttrs } from "./orders.types";
import { IQueryParams } from "common/types";
import { UserRolesType } from "entities/users/users.types";

@ApiTags("Table-order")
@Controller(ApiEntityPath + "/order")
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @ApiOperation({ summary: "Create order" })
  @ApiResponse({ status: 200, type: Order })
  @ApiHeader(ApiKeyHeader)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() orderDTO: OrderCreationAttrs, @Query() params: IQueryParams) {
    return this.orderService.createOrder(orderDTO, params);
  }

  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({ status: 200, type: Order })
  @ApiHeader(ApiKeyHeader)
  @Get()
  getAll(@Query() params: IQueryParams) {
    return this.orderService.getAllOrders(params);
  }

  @ApiOperation({ summary: "Get one order" })
  @ApiResponse({ status: 200, type: Order })
  @ApiHeader(ApiKeyHeader)
  @Get("/:id")
  getOne(@Param("id") id: number) {
    return this.orderService.getOrderById(id);
  }

  @ApiOperation({ summary: "Update order" })
  @ApiResponse({ status: 200, type: Order })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Put("/:id")
  update(@Param("id") id: number, @Body() orderDTO: CreateOrderDTO) {
    return this.orderService.updateOrder(id, orderDTO);
  }

  @ApiOperation({ summary: "Delete order" })
  @ApiResponse({ status: 200, type: Order })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.orderService.deleteOrder(id);
  }
}
