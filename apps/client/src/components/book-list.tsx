import { FC, useEffect, useState } from 'react';
import Book from './book';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSignIn } from 'react-auth-kit';
const BookList: FC = () => {
  const signIn = useSignIn()
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      let result = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'user',
          password: 'password',
        })
      })
      signIn({
        expiresIn: 0,
        token: "",
        tokenType: undefined
      });
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const result = await fetch(`/api/books?page=${page}`);
      const resultBooks = (await result.json()).result;
      if (page === 1)
        setBooks(resultBooks);
      else {
        setBooks(books => [...books, ...resultBooks]);
      }
    })();
  }, [page]);

  return (
    <InfiniteScroll
      dataLength={books.length} //This is important field to render the next data
      next={() => {
        setPage(page + 1);
      }}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="grid grid-cols-3">
        {books.map(function (book: any) {
          return <Book book={book} key={book.id} />;
        })}
      </div>
    </InfiniteScroll>
  );
};

export default BookList;
