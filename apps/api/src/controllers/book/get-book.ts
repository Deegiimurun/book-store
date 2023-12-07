import { Handler } from "express";
import { Book } from "../../entities/Book";

const getBook: Handler = async (req, res) => {
  const book = await Book.findOneBy({
    id: +req.params.bookId
  })

  if (!book) {
    return res.status(404).send({ error: 'BookList not found' })
  }

  res.send({
    result: book
  })
}

export { getBook }
