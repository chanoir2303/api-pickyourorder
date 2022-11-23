import {DataSource} from "typeorm";
import {Product} from "./src/orders/entities/product.entity";
import {Order} from "./src/orders/entities/order.entity";
import {OrderRefactor1669237864231} from "./src/migrations/1669237864231-OrderRefactor";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [Order, Product],
    migrations: [OrderRefactor1669237864231],
});