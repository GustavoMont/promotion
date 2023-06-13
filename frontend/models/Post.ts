import { Address } from "./Address";
import { User } from "./User";

export interface Post {
  id: number;
  title: string;
  description: string;
  promotionPrice: number;
  oldPrice: number;
  userId: number;
  address: Address;
  user: User;
}
