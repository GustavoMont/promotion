import { Title } from "@/components/Typograph/Title";
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
      <main className="pt-10">
        <Title level="h2" className="mb-10 text-center text-accent">
          Confira todas as ofertas!
        </Title>
        <section className="flex gap-5 justify-center">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-2 2xl:grid-cols-4">
            {posts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data: posts } = await api.get<Post[]>(`/posts`);

  return { props: { posts } };
};
