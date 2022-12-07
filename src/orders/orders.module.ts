import { Module } from '@nestjs/common';
import {OrdersController} from "./orders.controller";
import {OrdersService} from "./orders.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "../common/entities/order.entity";
import {Product} from "../common/entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Order, Product])],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}
