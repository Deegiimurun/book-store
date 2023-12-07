import { Handler } from "express";
import { Order } from "../../entities/Order";
import { User } from "../../entities/User";


const getOrders: Handler = async (req, res) => {
  const user: User = req.body.user;

  const orders = await Order.find({
    where: {
      user: {
        id: user.id
      }
    },
    relations: {
      book: true,
    }
  })

  return res.send({ result: orders });
}

export { getOrders }
