import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as path from 'path';
import { authRouter } from "./controllers/auth/router";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { bookRouter } from "./controllers/book/router";
import { orderRouter } from "./controllers/order/router";
import { specs } from "./swagger";
import { dataSource } from "./repository/data-source";

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use('/api/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);
app.use('/api/orders', orderRouter);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
