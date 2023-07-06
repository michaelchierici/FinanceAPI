import { User } from "../app/entity/User";

export interface CardProps {
  id: string;
  nickname: string;
  cardNumber: string;
  limit: string;
  user: User;
}
