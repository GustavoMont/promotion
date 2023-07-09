import { Title } from "@/components/Typograph/Title";
import PersonalPosts from "@/components/posts/PersonalPosts";
import api from "@/config/api";
import { Post } from "@/models/Post";
import { GetServerSideProps } from "next";
import React from "react";

interface Props {
  posts: Post[];
}

const MyPosts = ({ posts }: Props) => {
  return (
    <div>
      <Title level="h2" className="mb-10 mt-10 text-center text-accent">
        Minhas publicações
      </Title>
      <div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PersonalPosts post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data: posts } = await api.get<Post[]>(`/posts`);

  return { props: { posts } };
};

export default MyPosts;
