import swaggerJsdoc from 'swagger-jsdoc';
import { join } from 'path'

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "BookList-store Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a book-store application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [join(__dirname, "main.js")],
};

export const specs = swaggerJsdoc(options);
