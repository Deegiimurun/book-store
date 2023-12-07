import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm"
import { Order } from "./Order";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column({default: 100})
  point: number

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]
}
