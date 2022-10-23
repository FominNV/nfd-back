import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiEntityPath, ApiKeyHeader } from "common/headers";
import { Roles } from "decorators/roles-auth.decorator";
import { UserRolesType } from "entities/users/users.types";
import { RolesGuard } from "guards/roles.guard";
import { Category } from "./categories.model";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDTO } from "./dto/create-category.dto";

@ApiTags("Table-category")
@Controller(ApiEntityPath + "/category")
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @ApiOperation({ summary: "Create category" })
  @ApiResponse({ status: 200, type: Category })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() categoryDTO: CreateCategoryDTO) {
    return this.categoryService.createCategory(categoryDTO);
  }

  @ApiOperation({ summary: "Get all categories" })
  @ApiResponse({ status: 200, type: Category })
  @ApiHeader(ApiKeyHeader)
  @Get()
  getAll() {
    return this.categoryService.getAllCategories();
  }

  @ApiOperation({ summary: "Get one category" })
  @ApiResponse({ status: 200, type: Category })
  @ApiHeader(ApiKeyHeader)
  @Get("/:id")
  getOne(@Param("id") id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @ApiOperation({ summary: "Update category" })
  @ApiResponse({ status: 200, type: Category })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Put("/:id")
  update(@Param("id") id: number, @Body() categoryDTO: CreateCategoryDTO) {
    return this.categoryService.updateCategory(id, categoryDTO);
  }

  @ApiOperation({ summary: "Delete category" })
  @ApiResponse({ status: 200, type: Category })
  @ApiHeader(ApiKeyHeader)
  @Roles(UserRolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
