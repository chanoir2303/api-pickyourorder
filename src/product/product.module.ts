import { Module } from '@nestjs/common';
import {ProductController} from "./product.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "../common/entities/product.entity";
import {ProductsService} from "./products.service";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductsService]
})
export class ProductModule {}
