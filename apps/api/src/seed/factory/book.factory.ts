import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Book, BookTag } from "../../entities/Book";

export const BookFactory = setSeederFactory(Book, (faker: Faker) => {
  const book = new Book();
  book.writer = faker.person.firstName();
  book.quantity = faker.number.int({
    min: 1,
    max: 10,
  })
  book.point = faker.number.int({
    min: 5,
    max: 20,
  })
  book.tag = faker.helpers.enumValue(BookTag)
  book.title = faker.lorem.words();
  return book;
});
