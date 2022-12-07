import {DataSource} from "typeorm";
import {Product} from "./src/common/entities/product.entity";
import {Order} from "./src/common/entities/order.entity";
// import {OrderRefactor1669237864231} from "./src/migrations/1669237864231-OrderRefactor";
import {TestRefactor1670444791910} from "./src/migrations/1670444791910-TestRefactor";


export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [Order, Product],
    migrations: [TestRefactor1670444791910],
});