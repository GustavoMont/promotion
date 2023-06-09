import { Address } from "./Address";
import { User } from "./User";

export interface Post {
  map(arg0: (post: any) => { params: { id: any } }): unknown;
  id: number;
  title: string;
  description: string;
  image: string | undefined;
  promotionPrice: number;
  oldPrice: number;
  userId: number;
  address: Address;
  user: User;
}
