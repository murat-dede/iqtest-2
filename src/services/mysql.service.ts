import { Certificate } from "src/models/certificate.model"
import { Product } from "src/models/product.model"
import { Score } from "src/models/score.model"
import { User } from "src/models/user.model"
import { DataSource } from "typeorm"

// export const AppDataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "administrator",
//     password: "123456",
//     database: "iqtest",
//     synchronize: true,
//     logging: true,
//     entities: [User, Score, Product,Certificate],
//     subscribers: [],
//     migrations: [],
// })

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "pei17y9c5bpuh987.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
    port: 3306,
    username: "slk3ji607p2fk68o",
    password: "ugvh6nrrbkwrelzt",
    database: "d115riz1c86i3so2",
    synchronize: true,
    logging: true,
    entities: [User, Score, Product,Certificate],
    subscribers: [],
    migrations: [],
})