import express from "express";
import paginate from "express-paginate";
import { getBooks } from "./get-books";
import { getBook } from "./get-book";

const bookRouter = express.Router();

bookRouter.get('/', paginate.middleware(10, 50) ,getBooks);
bookRouter.get('/:bookId', getBook);

export { bookRouter };
