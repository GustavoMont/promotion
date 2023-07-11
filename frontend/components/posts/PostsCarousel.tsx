/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Post } from "@/models/Post";
import React, { useEffect, useState } from "react";
import { Title } from "../Typograph/Title";
import Link from "next/link";
import { PostCard } from "./PostCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    <Carousel
      autoPlay
      infiniteLoop
      interval={2000}
      swipeable
      className="w-[370px] "
    >
      {filteredPosts.map((post) => (
        <div key={post.id}>
          <PostCard post={post}></PostCard>
        </div>
      ))}
    </Carousel>
  );
};

export default PostsCarousel;
