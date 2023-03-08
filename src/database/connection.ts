import "reflect-metadata"
import { DataSource } from "typeorm";
import { Product } from "../entities/Product.entity";


const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "test",
  synchronize: true,
  logging: true,
  entities: [
    //__dirname + '/../**/*.entity.ts',
    __dirname + '/../**/*.entity.ts',
    //Product
  ],
  subscribers: [],
  migrations: [],
})
console.log(__dirname + '/../entities/*.entity.ts');
AppDataSource.initialize()
              .then(() => console.log('Connect success'))
              .catch((error) => console.log(error))

export default AppDataSource
