import { FC } from "react";
import { an } from "vitest/dist/reporters-5f784f42";
import { Typography } from "@mui/material";

interface IBook {
  book: any
}

const Book: FC<IBook> = ({book}) => {
  return (
    <div>
      <img src={book.coverUrl} alt=""/>
      <Typography>Title: {book.title}</Typography>
      <Typography>Author: {book.writer}</Typography>
    </div>
  )
}

export default Book
