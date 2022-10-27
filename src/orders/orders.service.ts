import {Injectable, NotFoundException} from '@nestjs/common';
import {Order} from "./entities/order.entity";

@Injectable()
export class OrdersService {
    private orders: Order[] = [
        {
            id: 1,
            status: 'pending',
            customer: 'mickey mouse',
            orderContent: ['sample 1', 'sample 2', 'sample 3'],
            totalPrice: 25,
            totalPaid: 0,
            deliverSlot: '03:00PM'
        },
        {
            id: 2,
            status: 'pending',
            customer: 'sirius black',
            orderContent: ['sample 1', 'sample 2', 'sample 3'],
            totalPrice: 25.50,
            totalPaid: 0,
            deliverSlot: '10:00AM'
        },
    ];

    findAll() {
        return this.orders;
    }

    findOne(id: string) {
        const order = this.orders.find(item => item.id === +id);
        if (!order) {
            throw new NotFoundException(`Order n°${id} not found`);
        }
        return order;
    }

    create(createOrderDto: any) {
        this.orders.push(createOrderDto);
    }

    update(id: string, updateOrderDto: any) {
        const existingOrder = this.findOne(id)
        if (existingOrder) {
            // update existing entity
        }
    }

    remove(id: string) {
        const orderIndex = this.orders.findIndex(item => item.id === +id);
        if (orderIndex >= 0) {
            this.orders.splice(orderIndex, 1);
        }
    }
}
