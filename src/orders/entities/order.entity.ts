import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product.entity";

@Entity() // sql table
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @Column()
    customer: string;

    @JoinTable()
    @ManyToMany(
        type => Product,
        product => product.orders,
    )
    orderContent: string[];

    @Column()
    totalPrice: number;

    @Column()
    totalPaid: number;

    @Column()
    deliverSlot: string;
}