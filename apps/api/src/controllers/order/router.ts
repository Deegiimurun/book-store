import express from "express";
import { authenticated } from "../../middlewares/authenticated";
import { getOrders } from "./get-orders";
import { createOrder } from "./create-order";
import { body } from "express-validator";
import { cancelOrder } from "./cancel-order";

const orderRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order managing API
 * /orders:
 *   get:
 *     summary: Get list of a orders of current user
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: The created order.
 *       500:
 *         description: Some server error
 *   post:
 *     summary: Create new order for current user
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookList'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookList'
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Cancel existing order for current user
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookList'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookList'
 *       500:
 *         description: Some server error
 */

orderRouter.get('/', authenticated, getOrders)
orderRouter.post('/',
  authenticated,
  body('bookId').trim().notEmpty().withMessage('bookId not found'),
  createOrder
)
orderRouter.delete('/',
  authenticated,
  body('orderId').trim().notEmpty().withMessage('orderId not found'),
  cancelOrder
)

export { orderRouter };
