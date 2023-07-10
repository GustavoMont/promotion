import { Title } from "@/components/Typograph/Title";
import { PostCard } from "@/components/posts/PostCard";
import api, { serverSideAPi } from "@/config/api";
import { Post } from "@/models/Post";
import { RoleEnum } from "@/models/User";
import { getTokenUser } from "@/utils/auth";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface Props {
  posts: Post[];
  complaintedPosts?: Post[];
}

export default function Home({ posts, complaintedPosts }: Props) {
  return (
    <>
      <Head>
        <title>Promotion - Escolha a melhor oferta!</title>
      </Head>
      <main className="pt-10">
        {complaintedPosts ? (
          <div className="flex">
            {complaintedPosts.map(({ title, id }) => (
              <div key={id}>{title}</div>
            ))}
          </div>
        ) : null}
        <Title level="h2" className="mb-10 text-center text-accent">
          Confira todas as ofertas!
        </Title>
        <div className="flex flex-col gap-5 md:grid md:grid-cols-2  2xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { data: posts } = await api.get<Post[]>(`/posts`);
  const user = getTokenUser(ctx);

  if (user?.role === RoleEnum.ADMIN) {
    const { data: complaintedPosts } = await serverSideAPi(ctx).get<Post[]>(
      "/posts/complaints?min=1"
    );
    return { props: { posts, complaintedPosts } };
  }

  return { props: { posts } };
};
