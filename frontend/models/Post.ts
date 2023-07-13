import { Address } from "./Address";
import { Complaints } from "./Complaints";
import { User } from "./User";

export interface Post {
  id: number;
  title: string;
  description: string;
  image: string | undefined;
  promotionPrice: number;
  oldPrice: number;
  userId: number;
  address: Address;
  user: User;
  complaints: Complaints[];
  updatedAt: Date;
}
