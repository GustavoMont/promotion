import { Title } from "@/components/Typograph/Title";
import PersonalPosts from "@/components/posts/PersonalPosts";
import { Post } from "@/models/Post";
import { listPostsByUser } from "@/services/postService";
import { getToken, getUserToken } from "@/utils/auth";
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
      <div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-3 justify-center">
        {posts.map((post) => (
          <PersonalPosts post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const token = getToken(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const user = getUserToken(token);
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const posts = await listPostsByUser(user.id, ctx);

  return { props: { posts } };
};

export default MyPosts;
