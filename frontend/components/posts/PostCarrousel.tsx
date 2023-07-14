import React from "react";
import { Title } from "../Typograph/Title";
import PostsCarousel from "./PostsCarousel";
import { Post } from "@/models/Post";
interface Props {
  posts: Post[];
}

export const PostCarrousel: React.FC<Props> = ({ posts }) => {
  return (
    <div className="w-full flex flex-col mt-4 items-center justify-center">
      <Title className="text-primary">Outras promoções</Title>
      <PostsCarousel posts={posts} />
    </div>
  );
};
