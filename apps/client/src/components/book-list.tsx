import { FC, useEffect, useState } from "react";
import Book from "./book";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuthUser, useIsAuthenticated, useSignIn } from "react-auth-kit";

const BookList: FC = () => {
  const user = useAuthUser();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const result = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: "user",
          password: "password"
        })
      });

      const { user, token } = (await result.json()).result;

      signIn({
        expiresIn: token.expiresIn,
        token: token.token,
        tokenType: 'Bearer',
        authState: user
      });
    })();
  }, []);

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
    >
      <div className="grid grid-cols-3">
        {books.map(function(book: any) {
          return <Book book={book} key={book.id} />;
        })}
      </div>
    </InfiniteScroll>
  );
};

export default BookList;
