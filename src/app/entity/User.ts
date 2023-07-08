import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Card } from "./Card";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  job: string;

  @Column()
  age: string;

  @Column()
  @UpdateDateColumn()
  updatedAt?: Date;

  @Column()
  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Card, (card) => card.user, {
    eager: true,
    cascade: ["soft-remove"],
  })
  @JoinColumn()
  cards: Card[];
}
