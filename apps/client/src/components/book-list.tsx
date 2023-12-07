import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import Book from "./book";
import InfiniteScroll from 'react-infinite-scroll-component';

const BookList: FC = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ['fetch-book'],
    queryFn: () =>
      fetch(`/api/books`).then(
        (res) => res.json(),
      ),
  })

  if (isPending) {
    return 'pending'
  }

  if (error) {
    return 'error'
  }

  return (
    <div className='grid grid-cols-3'>
      {data.result.map(function (book: any) {
        return (<Book book={book} key={book.id}/>)
      })}
    </div>
  )
}

export default BookList
