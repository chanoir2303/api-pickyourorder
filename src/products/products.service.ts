import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../common/entities/product.entity";
import {Repository} from "typeorm";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {CreateOrderDto} from "../common/dto/create-order.dto";
import {CreateProductDto} from "../common/dto/create-product.dto";
import {UpdateProductDto} from "../common/dto/update-product.dto";

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    findAll(paginationQuery: PaginationQueryDto) {
        const {limit, offset} = paginationQuery
        return this.productRepository.find({
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: string) {
        const product = await this.productRepository.findOne({where: {id: +id}});
        if (!product) {
            throw new NotFoundException(`Product n°${id} not found`);
        }
        return product;
    }

    async create(createProductDto: CreateProductDto) {
        const product = this.productRepository.create({
           ...createProductDto,
        });
        return this.productRepository.save(product);
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.productRepository.preload({
            id: +id,
            ...updateProductDto,
        });
        if (!product) {
            throw new NotFoundException(`Product n°${id} not found`);
        }
        return this.productRepository.save(product);
    }

    async remove(id: string) {
        const product = await this.findOne(id);
        return this.productRepository.remove(product);
    }
}
