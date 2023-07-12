import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Transaction } from "./Transaction";

@Entity()
export class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nickname: string;

  @Column()
  cardNumber: string;

  @Column({ nullable: true })
  limit: number;

  @Column({ nullable: true })
  flag: string;

  @Column()
  @UpdateDateColumn()
  updatedAt?: Date;

  @Column()
  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.cards, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.card, {
    eager: true,
  })
  @JoinColumn()
  transactions: Transaction[];
}
