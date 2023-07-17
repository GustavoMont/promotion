import { Title } from "@/components/Typograph/Title";
import { Button } from "@/components/common/Button";
import PersonalPosts from "@/components/posts/PersonalPosts";
import { Avatar } from "@/components/user/Avatar";
import { EditProfileModal } from "@/components/user/EditProfileModal";
import { useAuth } from "@/context/AuthContext";
import { listPostsByUser } from "@/services/postService";
import { getToken, getUserToken } from "@/utils/auth";
import { PencilIcon } from "@heroicons/react/24/outline";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useState } from "react";

const MyPosts = () => {
  const { user } = useAuth();
  const { data: posts } = useQuery(["profile-posts", user?.id], () =>
    listPostsByUser(user?.id || 0)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="max-w-5xl mx-auto mt-10">
      {isModalOpen && user ? (
        <EditProfileModal handleCancelClick={closeModal} user={user} />
      ) : null}
      <h2 className="text-primary text-3xl font-medium text-center">
        Seja bem vindo(a), {user?.name}
      </h2>
      <div className="my-5 flex items-center gap-5">
        <Avatar img={user?.avatar || undefined} size="w-16" />
        <div className="flex flex-col gap-1">
          <h4 className="text-xl text-slate-700">
            {user?.name} {user?.lastName}
          </h4>
          <button
            className="flex items-center gap-1 text-yellow-500 underline cursor-pointer hover:text-yellow-700 active:scale-95 transition-all duration-150 ease-in-out"
            onClick={() => setIsModalOpen(true)}
          >
            <span>Editar perfil</span>
            <PencilIcon className="w-5" />
          </button>
        </div>
      </div>
      {posts?.length ? (
        <>
          <Title level="h2" className="mb-10 mt-10 text-center text-accent">
            Minhas publicações
          </Title>
          <div className="carousel w-full carousel-center p-4 space-x-4 rounded-box">
            {posts.map((post) => (
              <div className="carousel-item" key={post.id}>
                <PersonalPosts post={post} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col space-y-5 items-center mt-20">
          <Title>Você ainda não fez nenhuma publicação =(</Title>

          <Button color="primary" className="w-fit" rounded>
            <Link href="/criar-postagem">Criar publicação</Link>
          </Button>
        </div>
      )}
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
