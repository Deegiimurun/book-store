import { Entity, BaseEntity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm"
import { User } from "./User";
import { Book } from "./Book";

export enum OrderStatus {
  ORDERED = "ordered",
  CANCELLED = "cancelled",
  DELIVERED = "delivered",
}

@Entity()
export class Order extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.ORDERED
  })
  status: OrderStatus

  @ManyToOne(() => User, (user) => user.orders)
  public user: User

  @ManyToOne(() => Book, (book) => book.orders)
  public book: Book

}
