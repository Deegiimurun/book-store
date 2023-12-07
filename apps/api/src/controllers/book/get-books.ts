import { Handler } from "express";
import { Book } from "../../entities/Book";

const getBooks: Handler = async (req, res) => {
  const {page, limit} = req.query;

  const books = await Book.find({
      skip: (+page - 1) * +limit,
      take: +limit
    })

  res.send({ result: books })
}

export { getBooks }
