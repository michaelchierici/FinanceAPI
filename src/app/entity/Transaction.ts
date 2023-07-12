import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Card } from "./Card";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  value: number;

  @Column({ nullable: true })
  transaction_date: string;

  @Column()
  @UpdateDateColumn()
  updatedAt?: Date;

  @Column()
  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Card, (card) => card.transactions)
  @JoinColumn()
  card: Card;
}
