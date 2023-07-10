import { Title } from "@/components/Typograph/Title";
import { PostCard } from "@/components/posts/PostCard";
import { ComplaintPostsList } from "@/components/posts/admin/ComplaintPostsList";
import api, { serverSideAPi } from "@/config/api";
import { useAuth } from "@/context/AuthContext";
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
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Promotion - Escolha a melhor oferta!</title>
      </Head>
      <main className="pt-10">
        <Title level="h2" className="mb-10 text-center text-accent">
          Confira todas as ofertas!
        </Title>
        <section className="flex gap-5">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-2 2xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
          {user?.role === RoleEnum.ADMIN ? (
            <aside>
              <ComplaintPostsList posts={complaintedPosts} />
            </aside>
          ) : null}
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { data: posts } = await api.get<Post[]>(`/posts`);
  const user = getTokenUser(ctx);

  if (user?.role === RoleEnum.ADMIN) {
    const { data: complaintedPosts } = await serverSideAPi(ctx).get<Post[]>(
      "/posts/complaints?min=5"
    );
    return { props: { posts, complaintedPosts } };
  }

  return { props: { posts } };
};
