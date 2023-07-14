import { Title } from "@/components/Typograph/Title";
import PersonalPosts from "@/components/posts/PersonalPosts";
import { useAuth } from "@/context/AuthContext";
import { listPostsByUser } from "@/services/postService";
import { getToken, getUserToken } from "@/utils/auth";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import React from "react";

const MyPosts = () => {
  const { user } = useAuth();
  const { data: posts } = useQuery(["profile-posts", user?.id], () =>
    listPostsByUser(user?.id || 0)
  );
  return (
    <div>
      <Title level="h2" className="mb-10 mt-10 text-center text-accent">
        Minhas publicações
      </Title>
      <div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-3 justify-center">
        {posts?.map((post) => (
          <PersonalPosts post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["profile-posts", user.id], () =>
    listPostsByUser(user.id, ctx)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MyPosts;
