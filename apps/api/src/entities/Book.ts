import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm"
import { Order } from "./Order";

export enum BookTag {
  FICTION = "fiction",
  NON_FICTION = "non-fiction",
  SCIENCE = "science",
  ESSAY = "essay",
}


@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  writer: string

  @Column()
  quantity: number

  @Column({
    default: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg'
  })
  coverUrl: string

  @Column()
  point: number

  @Column({
    type: "enum",
    enum: BookTag,
  })
  tag: BookTag

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

}
