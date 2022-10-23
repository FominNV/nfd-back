import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "entities/auth/auth.module";
import { OrderStatusesController } from "./order-statuses.controller";
import { OrderStatus } from "./order-statuses.model";
import { OrderStatusesService } from "./order-statuses.service";

@Module({
  imports: [
    SequelizeModule.forFeature([OrderStatus]),
    JwtModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [OrderStatusesController],
  providers: [OrderStatusesService],
  exports: [OrderStatusesService],
})
export class OrderStatusesModule {}
