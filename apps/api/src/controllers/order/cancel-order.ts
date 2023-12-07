import { Handler } from "express";
import { validationResult } from "express-validator";
import { User } from "../../entities/User";
import { Order, OrderStatus } from "../../entities/Order";

const cancelOrder: Handler = async (req, res) => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    return res.status(400).send({ error: result.array()[0].msg });
  }

  const { orderId } = req.body;
  const user: User = req.body.user;

  const order = await Order.findOne({
    where: {
      id: orderId,
    },
    relations: {
      book: true
    }
  })

  if (!order) {
    return res.status(400).send({ error: 'order not found' });
  }

  if (order.status !== OrderStatus.ORDERED) {
    return res.status(400).send({ error: 'order status mismatch' });
  }

  order.book.quantity++;
  await order.book.save();

  user.point += order.book.point;
  await user.save();

  order.status = OrderStatus.CANCELLED;
  await order.save();

  return res.send({ result: order });
};

export { cancelOrder }
