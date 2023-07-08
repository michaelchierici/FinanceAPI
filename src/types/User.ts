import { CardProps } from "./Card";

export interface UserProps {
  id: string;
  name: string;
  job: string;
  age: string;
  cards: CardProps[];
}
