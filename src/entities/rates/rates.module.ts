import { RatesController } from "./rates.controller";
import { RatesService } from "./rates.service";
import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "entities/auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";
import { RateType } from "entities/rateTypes/rate-types.model";
import { Rate } from "./rates.model";
import { RateTypesModule } from "entities/rateTypes/rate-types.module";
import { Order } from "entities/orders/orders.model";
import { OrdersModule } from "entities/orders/orders.module";

@Module({
  imports: [
    SequelizeModule.forFeature([RateType, Rate, Order]),
    JwtModule,
    forwardRef(() => AuthModule),
    forwardRef(() => RateTypesModule),
    forwardRef(() => OrdersModule),
  ],
  controllers: [RatesController],
  providers: [RatesService],
  exports: [RatesService],
})
export class RatesModule {}
