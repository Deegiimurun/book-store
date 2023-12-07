import { DataSource, DataSourceOptions } from "typeorm";
import { Book } from "../entities/Book";
import { User } from "../entities/User";
import { Order } from "../entities/Order";
import { SeederOptions } from "typeorm-extension";
import MainSeeder from "../seed/main.seeder";
import { BookFactory } from "../seed/factory/book.factory";

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: [
    Book,
    User,
    Order,
  ],
  synchronize: true,
  factories: [BookFactory],
  seeds: [MainSeeder]
}

export const dataSource = new DataSource(options)
