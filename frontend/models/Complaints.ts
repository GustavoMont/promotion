import { Post } from "./Post";
import { User } from "./User";

export enum ReasonEnum {
  ADULT_CONTENT,
  FAKE_PROMOTION,
  SPAM,
  FRAUD,
  HATE_SPEECH,
  OTHER,
}

export interface Complaints {
  id: number;
  user: User;
  userId: number;
  post: Post;
  postId: number;
  reason: ReasonEnum;
  explain: string | null;
}
