import React, { useEffect } from "react";
import api from "@/config/api";
import { Post } from "@/models/Post";
import FullPostCard from "@/components/posts/FullPostCard";
import { GetStaticPaths, GetStaticProps } from "next";
import { getToken } from "@/utils/auth";
import { useRouter } from "next/router";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getPost, listPosts } from "@/services/postService";
import PostsCarousel from "@/components/posts/PostsCarousel";
import Head from "next/head";

export default function Details() {
  const router = useRouter();
  const postId = router.query.id;
  const { data: post, isLoading } = useQuery(["post", postId], () =>
    getPost(+(postId || 0))
  );
  const { data: posts } = useQuery(["posts"], () => listPosts());

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Promotion - {post?.title}</title>
      </Head>
      <div className="flex justify-center items-center">
        {isLoading && (
          <>
            <span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
          </>
        )}
        {post && <FullPostCard post={post} />}
        {posts && <PostsCarousel posts={posts} />}
      </div>
    </>
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
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["post"],
    async () => await api.get<Post>(`/posts/${id}`)
  );
  await queryClient.prefetchQuery(
    ["posts"],
    async () => await api.get<Post[]>(`/posts`)
  );

  return {
    props: {},
  };
};
