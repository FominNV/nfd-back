import { CarsController } from "./cars.controller";
import { Module, forwardRef } from "@nestjs/common";
import { Car } from "./cars.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "entities/auth/auth.module";
import { CarsService } from "./cars.service";
import { CategoriesModule } from "entities/categories/categories.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Car]),
    JwtModule,
    forwardRef(() => AuthModule),
    CategoriesModule,
  ],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
