import { Certificate } from "src/models/certificate.model"
import { Product } from "src/models/product.model"
import { Score } from "src/models/score.model"
import { User } from "src/models/user.model"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "administrator",
    password: "123456",
    database: "iqtest",
    synchronize: true,
    logging: true,
    entities: [User, Score, Product,Certificate],
    subscribers: [],
    migrations: [],
})