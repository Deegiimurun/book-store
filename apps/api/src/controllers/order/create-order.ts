import { Handler } from "express";
import { validationResult } from "express-validator";
import { Book } from "../../entities/Book";
import { Order } from "../../entities/Order";
import { User } from "../../entities/User";


const createOrder: Handler = async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).send({ error: result.array()[0].msg });
  }

  const { bookId } = req.body;
  const user: User = req.body.user;

  const book = await Book.findOne({
    where: {
      id: bookId,
    }
  })

  if (!book) {
    return res.status(400).send({ error: 'BookList not found.' });
  }

  if (book.quantity < 1) {
    return res.status(400).send({ error: 'BookList is out of stock' })
  }

  if (user.point < book.point) {
    return res.status(400).send({ error: 'Not enough point.' });
  }

  book.quantity--;
  await book.save();

  user.point -= book.point;
  await user.save();

  const order = new Order();
  order.user = user;
  order.book = book;
  await order.save();

  delete order.user;

  return res.send({ result: order });
}

export { createOrder }
