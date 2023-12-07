import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Book } from "../entities/Book";

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ) {
    const bookRepository = dataSource.getRepository(Book);
    const bookFactory = factoryManager.get(Book);

    const books = await bookFactory.saveMany(5000);

    await bookRepository.save(books);
  }
}
