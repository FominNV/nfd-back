import { CategoriesService } from "./categories.service";
import { forwardRef, Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "./categories.model";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Category]),
    JwtModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
