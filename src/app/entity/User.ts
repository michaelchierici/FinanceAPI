import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];
}
