# BookStore

## Start the app

1. First start docker for postgres:  ```docker run --name book-store -e POSTGRES_PASSWORD=postgres -d postgres```
2. Then install packages: ```npm i```
3. Then run seed for books:  ```nx seed api```
4. Run backend ```nx serve api```
5. Run frontend ```nx serve client```
6. ```localhost:3000/docs```: swagger link
