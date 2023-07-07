import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
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

  @OneToMany(() => Card, (card) => card.user, {
    eager: true,
  })
  @JoinTable()
  cards: Card[];
}
