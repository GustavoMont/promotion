import React from "react";
import api from "@/config/api";
import { Post } from "@/models/Post";

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

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const { data: post } = await api.get<Post>(`/posts/${id}`);
  console.log(post);
  return { props: { post } };
};

export default function Details({ post }: { post: Post }) {
  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.description}</p>
      <p>
        {post.address ? post.address.city.name : <p>Sem endereço cadastrado</p>}
      </p>
    </div>
  );
}
