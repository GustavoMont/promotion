import Table from "@/components/dashboard/Table";
import api from "@/config/api";
import { Post } from "@/models/Post";
import { GetServerSideProps } from "next";
import React from "react";

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  return (
    <div>
      <Table posts={posts} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PostsProps> = async () => {
  const { data: posts } = await api.get<Post[]>(`/posts`);

  return { props: { posts } };
};
