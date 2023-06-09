import React from "react";
import api from "@/config/api";
import { Post } from "@/models/Post";
import FullPostCard from "@/components/posts/FullPostCard";
import { GetStaticProps } from "next";

export default function Details({ post }: DetailsProps) {
  return (
    <div className="flex justify-center items-center">
      <FullPostCard post={post} />
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
  return { props: { post } };
};

type DetailsProps = {
  post: Post;
};
