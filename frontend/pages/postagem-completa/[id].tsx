import React, { useEffect } from "react";
import api from "@/config/api";
import { Post } from "@/models/Post";
import FullPostCard from "@/components/posts/FullPostCard";
import { GetStaticPaths, GetStaticProps } from "next";
import { getToken } from "@/utils/auth";
import { useRouter } from "next/router";

type DetailsProps = {
  post: Post;
  posts: Post[];
};

export default function Details({ post, posts }: DetailsProps) {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center">
      <FullPostCard post={post} posts={posts} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
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
