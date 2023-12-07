import { FC } from 'react';
import { Button, Typography } from '@mui/material';
import { useAuthUser } from 'react-auth-kit';

interface IBook {
  book: any;
}

const Book: FC<IBook> = ({ book }) => {
  const user = useAuthUser();

  const orderBook = async () => {
    const result = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bookId: book.id
      })
    });

    console.log(await result.json());
  };

  const login = async () => {};

  return (
    <div>
      <img src={book.coverUrl} alt="" />
      <Typography>Title: {book.title}</Typography>
      <Typography>Author: {book.writer}</Typography>
      <Typography>Quantity: {book.quantity}</Typography>
      {user() ? (
        <Button onClick={orderBook}>Order</Button>
      ) : (
        <Button onClick={login}>Login</Button>
      )}
    </div>
  );
};

export default Book;
