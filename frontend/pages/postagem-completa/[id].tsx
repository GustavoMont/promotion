import React from "react";
import api from "@/config/api";
import { Post } from "@/models/Post";
import FullPostCard from "@/components/posts/FullPostCard";
import { GetStaticProps } from "next";

type DetailsProps = {
  post: Post;
  posts: Post[];
};

export default function Details({ post, posts }: DetailsProps) {
  return (
    <div className="flex justify-center items-center">
      <FullPostCard post={post} posts={posts} />
    </div>
  );
}

export const getStaticPaths = async () => {
  const { data: posts } = await api.get<Post[]>("/posts");

  const paths = posts.map((post) => {
    return {
      params: { id: post.id.toString() },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const { data: post } = await api.get<Post>(`/posts/${id}`);
  const { data: posts } = await api.get<Post[]>(`/posts`);
  return { props: { post, posts } };
};
