import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";

@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) {}

    // get all orders
    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.ordersService.findAll(paginationQuery);
    }

    // get one specific order by id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }

    // create an order
    @Post()
    create(@Body() body) {
        this.ordersService.create(body);
    }

    // update one specific order by id
    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return this.ordersService.update(id, body);
    }

    // delete one specific order by id
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(id);
    }
}
