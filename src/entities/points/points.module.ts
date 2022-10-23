import { PointsController } from "./points.controller";
import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { Point } from "./points.model";
import { AuthModule } from "entities/auth/auth.module";
import { PointsService } from "./points.service";
import { CitiesModule } from "entities/cities/cities.module";
import { City } from "entities/cities/cities.model";
import { OrdersModule } from "entities/orders/orders.module";
import { Order } from "entities/orders/orders.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Point, City, Order]),
    JwtModule,
    forwardRef(() => AuthModule),
    forwardRef(() => CitiesModule),
    forwardRef(() => OrdersModule),
  ],
  controllers: [PointsController],
  providers: [PointsService],
  exports: [PointsService],
})
export class PointsModule {}
