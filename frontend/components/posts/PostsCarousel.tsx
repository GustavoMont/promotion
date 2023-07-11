/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Post } from "@/models/Post";
import React, { useEffect, useState } from "react";
import { Title } from "../Typograph/Title";
import Link from "next/link";
import { PostCard } from "./PostCard";

type PostsCarouselProps = {
  posts: Post[];
};

const PostsCarousel = ({ posts }: PostsCarouselProps) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const filteredPosts = posts.slice(0, 3);
    setFilteredPosts(filteredPosts);
  }, []);

  return (
    <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-light-black rounded-box">
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          id={`post${post.id}`}
          className="carousel-item flex flex-col gap-2 p-2 "
        >
          {/* <Link href={`/postagem-completa/${post.id}`}>
            <Title className="text-white">{post.title}</Title>
          </Link>

          <img src={post.image} className="w-[200px] rounded" /> */}
          <PostCard post={post}></PostCard>
        </div>
      ))}
    </div>
  );
};

export default PostsCarousel;
