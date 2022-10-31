import {Injectable, NotFoundException} from '@nestjs/common';
import {Order} from "./entities/order.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateOrderDto} from "./dto/create-order.dto";
import {UpdateOrderDto} from "./dto/update-order.dto";

@Injectable()
export class OrdersService {

    constructor(
       @InjectRepository(Order)
       private readonly orderRepository: Repository<Order>,
    ) {}

    findAll() {
        return this.orderRepository.find();
    }

    async findOne(id: string) {
        const order = await this.orderRepository.findOne({where: {id: +id}});
        if (!order) {
            throw new NotFoundException(`Order n°${id} not found`);
        }
        return order;
    }

    create(createOrderDto: CreateOrderDto) {
        const order = this.orderRepository.create(createOrderDto);
        return this.orderRepository.save(order);
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        const order = await this.orderRepository.preload({
            id: +id,
            ...updateOrderDto,
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
}
