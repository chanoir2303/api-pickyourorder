import { Module } from '@nestjs/common';
import {OrdersController} from "./orders.controller";
import {OrdersService} from "./orders.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "./entities/order.entity";
import {Product} from "./entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Order, Product, Event])],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}
