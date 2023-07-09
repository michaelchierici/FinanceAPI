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
}
