import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productService: ProductsService
    ) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.productService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
       return this.productService.findOne(id);
    }

    @Post()
    create(@Body() body) {
        this.productService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return this.productService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }
}
