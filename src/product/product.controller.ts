import {Controller, Get, Param, Query, Post, Body, Patch, Delete} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";

@Controller('product')
export class ProductController {

    constructor (private readonly productService: ProductsService) {}

    // get all products
    // optional pagination
    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto){
        return this.productService.findAll(paginationQuery);
    }

    // get one specific product by id
    @Get('id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    // create a product
    @Post()
    create(@Body() body) {
        this.productService.create(body);
    }

    // update one specific product by id
    @Patch()
    update(@Param('id') id: string, @Body() body) {
        return this.productService.update(id, body);
    }

    // delete one specific order by id
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }
}

