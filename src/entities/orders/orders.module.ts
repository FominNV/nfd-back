import { OrdersService } from "./orders.service";
import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./orders.model";
import { AuthModule } from "entities/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { OrdersController } from "./orders.controller";
import { OrderStatusesModule } from "entities/orderStatuses/order-statuses.module";
import { CitiesModule } from "entities/cities/cities.module";
import { PointsModule } from "entities/points/points.module";
import { RatesModule } from "entities/rates/rates.module";
import { CarsModule } from "entities/cars/cars.module";
import { OrderStatus } from "entities/orderStatuses/order-statuses.model";
import { Car } from "entities/cars/cars.model";
import { Rate } from "entities/rates/rates.model";
import { Point } from "entities/points/points.model";
import { City } from "entities/cities/cities.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Order, OrderStatus, Car, Rate, Point, City]),
    JwtModule,
    forwardRef(() => AuthModule),
    forwardRef(() => OrderStatusesModule),
    forwardRef(() => CitiesModule),
    forwardRef(() => PointsModule),
    forwardRef(() => RatesModule),
    forwardRef(() => CarsModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
