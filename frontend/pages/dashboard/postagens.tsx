import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { PostTable } from "@/components/dashboard/posts/PostTable";
import { Post } from "@/models/Post";
import { listMostComplaintsPosts } from "@/services/postService";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import React from "react";

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  return (
    <DashboardLayout>
      {posts.length ? (
        <PostTable posts={posts} />
      ) : (
        <div className="alert p-7">
          <InformationCircleIcon className="w-8" />
          <span className="text-2xl">Não há posts para avaliar.</span>
        </div>
      )}
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<PostsProps> = async (
  ctx
) => {
  const posts = await listMostComplaintsPosts(ctx);

  return { props: { posts } };
};
