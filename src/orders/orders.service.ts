import {Injectable, NotFoundException} from '@nestjs/common';
import {Order} from "../common/entities/order.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateOrderDto} from "./dto/create-order.dto";
import {UpdateOrderDto} from "./dto/update-order.dto";
import {Product} from "../common/entities/product.entity";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";

@Injectable()
export class OrdersService {

    constructor(
       @InjectRepository(Order)
       private readonly orderRepository: Repository<Order>,
       @InjectRepository(Product)
       private readonly productRepository: Repository<Product>,
    ) {}

    findAll(paginationQuery: PaginationQueryDto) {
        const {limit, offset} = paginationQuery
        return this.orderRepository.find(
            {
                relations: {
                    orderContent: true,
                },
                skip: offset,
                take: limit,
            });
    }

    async findOne(id: string) {
        const order = await this.orderRepository.findOne({where: {id: +id}, relations: { orderContent: true}});
        if (!order) {
            throw new NotFoundException(`Order n°${id} not found`);
        }
        return order;
    }

    async create(createOrderDto: CreateOrderDto) {
        const orderContent = await Promise.all(
            createOrderDto.orderContent.map(name => this.preloadProductByName(name)),
        );

        const order = this.orderRepository.create({
            ...createOrderDto,
            orderContent,
        });
        return this.orderRepository.save(order);
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        const orderContent = updateOrderDto.orderContent && (await Promise.all(
            updateOrderDto.orderContent.map(name => this.preloadProductByName(name)),
        ));

        const order = await this.orderRepository.preload({
            id: +id,
            ...updateOrderDto,
            orderContent,
        });
        if (!order) {
            throw new NotFoundException(`Order n°${id} not found`);
        }
        return this.orderRepository.save(order);
    }

    async remove(id: string) {
      const order = await this.findOne(id);
      return this.orderRepository.remove(order);
    }

    private async preloadProductByName(name: string): Promise<Product> {
        const existingProduct = await this.productRepository.findOne({
            where: {name},
        });
        if (existingProduct) {
            return existingProduct;
        }
        return this.productRepository.create({name});
    }
}
