import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import {Order} from "./order.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(
        type => Order,
        order => order.orderContent,
    )
    orders: Order[];

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    tva: number;
}