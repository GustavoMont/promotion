/* eslint-disable @next/next/no-img-element */
import { Post } from "@/models/Post";
import { currencyFormatter } from "@/utils/formatter";
import React, { useState } from "react";
import AddressCard from "./address/AddressCard";
import ReportPostModal from "./ReportPostModal";
import {
  FlagIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { Title } from "../Typograph/Title";
import PostsCarousel from "./PostsCarousel";

type FullPostCardProps = {
  post: Post;
  posts: Post[];
};

const FullPostCard = ({ post, posts }: FullPostCardProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex flex-col p-2 gap-8 md:flex-row w-full h-full justify-center">
        {showModal ? <ReportPostModal setShowModal={setShowModal} /> : null}

        <div className="flex flex-col gap-4 bg-white  p-4 shadow rounded-t-lg border-t-8 border-t-primary w-full max-w-[500px]">
          <div className="flex gap-2 items-center justify-between">
            {/* <div className="flex flex-col items-center gap-1">
            <img
              src={post.user.avatar || "bonzi.jpg"}
              className="rounded-full w-[40px] h-[40px]"
            />

            <div>{post?.user ? post?.user?.name : "Nome de usuário"}</div>
          </div> */}
            <Title className="underline">{post.title}</Title>
            <div
              className="flex flex-col text-danger  p-2 items-center gap-2 hover:underline cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <FlagIcon className="h-10 w-10 text-danger font-medium p-1 rounded-md   transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105" />
              <p className="text-xs italic">Denunciar</p>
            </div>
          </div>
          <figure className="border-2 flex items-center justify-center">
            <img
              className=" rounded "
              src={"https://placehold.co/600X400"}
              alt="Album"
            />
          </figure>

          <div className="my-2 p-2 flex gap-2 justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-red-500 font-thin text-xs line-through">
                {currencyFormatter(post.oldPrice)}
              </p>
              <p className="text-accent font-semibold text-xl">
                {currencyFormatter(post.promotionPrice)}
              </p>
            </div>

            <div className="flex gap-8">
              <HandThumbUpIcon className="w-[30px] text-primary" />
              <HandThumbDownIcon className="w-[30px] text-danger" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-white  p-4 shadow rounded-t-lg border-t-8 border-t-primary w-full max-w-[500px]">
          <div>
            <Title>Mais informações</Title>
            <p>{post.description}</p>
          </div>

          <AddressCard address={post.address} />
        </div>
      </div>

      <div className="w-full flex flex-col mt-4 items-center justify-center">
        <Title className="text-primary">Outras promoções</Title>
        <PostsCarousel posts={posts} />
      </div>
    </div>
  );
};

export default FullPostCard;
