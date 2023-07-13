import { Post } from "./Post";
import { User } from "./User";

export interface Reason {
  reason: number;
  name: string;
}

export interface Complaint {
  id: number;
  user: User;
  userId: number;
  post: Post;
  postId: number;
  reason: number;
  explain: string | null;
}
