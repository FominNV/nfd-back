import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "entities/auth/auth.module";
import { RateTypesController } from "./rate-types.controller";
import { RateType } from "./rate-types.model";
import { RateTypesService } from "./rate-types.service";

@Module({
  imports: [
    SequelizeModule.forFeature([RateType]),
    JwtModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [RateTypesController],
  providers: [RateTypesService],
  exports: [RateTypesService],
})
export class RateTypesModule {}
