import { PostCard } from "@/components/posts/PostCard";
import api from "@/config/api";
import { Post } from "@/models/Post";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Promotion - Escolha a melhor oferta!</title>
      </Head>
      <main>
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data: posts } = await api.get<Post[]>(`/posts`);

  return { props: { posts } };
};
