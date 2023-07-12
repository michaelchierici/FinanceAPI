import { User } from "../app/entity/User";

export interface CardProps {
  id: string;
  nickname: string;
  cardNumber: string;
  flag: "Visa" | "Master";
  limit: number;
  user: User;
}
