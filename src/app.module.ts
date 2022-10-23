import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize"
import { OrdersModule } from "./entities/orders/orders.module";
import { CarsModule } from "./entities/cars/cars.module";
import { OrderStatusesModule } from "./entities/orderStatuses/order-statuses.module";
import { RatesModule } from "./entities/rates/rates.module";
import { RateTypesModule } from "./entities/rateTypes/rate-types.module";
import { CitiesModule } from "./entities/cities/cities.module";
import { City } from "./entities/cities/cities.model";
import { CategoriesModule } from "./entities/categories/categories.module";
import { AuthModule } from "./entities/auth/auth.module";
import { UsersModule } from "./entities/users/users.module";
import { User } from "./entities/users/users.model";
import { Role } from "./entities/roles/roles.model";
import { UserRoles } from "./entities/roles/user-roles.model";
import { RolesModule } from "./entities/roles/roles.module";
import { Category } from "./entities/categories/categories.model";
import { Car } from "entities/cars/cars.model";
import { Point } from "./entities/points/points.model";
import { PointsModule } from "./entities/points/points.module";
import { RateType } from "./entities/rateTypes/rate-types.model";
import { Order } from "entities/orders/orders.model";
import { OrderStatus } from "entities/orderStatuses/order-statuses.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    OrdersModule,
    CarsModule,
    OrderStatusesModule,
    RatesModule,
    RateTypesModule,
    PointsModule,
    CitiesModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [City, Car, Category, UserRoles, User, Role, Point, RateType, Order, OrderStatus],
      autoLoadModels: true,
    }),
    CategoriesModule,
    AuthModule,
    UsersModule,
    RolesModule,
    AuthModule,
  ],
})
export class AppModule {}
