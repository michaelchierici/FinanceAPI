import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nickname: string;

  @Column()
  cardNumber: string;

  @Column()
  limit: string;

  @ManyToOne(() => User, (user) => user.cards)
  user: User;
}
