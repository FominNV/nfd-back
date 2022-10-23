import { CitiesController } from "./cities.controller";
import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { City } from "./cities.model";
import { JwtModule } from "@nestjs/jwt";
import { CitiesService } from "./cities.service";
import { AuthModule } from "../auth/auth.module";
import { Point } from "entities/points/points.model";
import { Order } from "entities/orders/orders.model";
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [
    SequelizeModule.forFeature([City, Point, Order]),
    JwtModule,
    forwardRef(() => AuthModule),
    forwardRef(() => OrdersModule),
  ],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
