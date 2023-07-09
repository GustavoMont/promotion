/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Post } from "@/models/Post";
import { currencyFormatter } from "@/utils/formatter";
import React, { useState } from "react";
import AddressCard from "./address/AddressCard";
import { useForm } from "react-hook-form";
import { Button } from "../common/Button";
import ReportPostModal from "./ReportPostModal";
import { FlagIcon } from "@heroicons/react/24/outline";

type FullPostCardProps = {
  post: Post;
};

const FullPostCard = ({ post }: FullPostCardProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-full p-4 max-w-[635px]">
      {showModal ? <ReportPostModal setShowModal={setShowModal} /> : null}

      <header className="flex justify-between m-2 items-start sm:flex-row sm:border-black">
        <div className="flex gap-2">
          <img
            src={post.user.avatar || "bonzi.jpg"}
            className="rounded-full w-[64px] h-[64px]"
          />
          <div>{post?.user ? post?.user?.name : "Nome de usuário"}</div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <h2 className="card-title">{post.title}</h2>
          <FlagIcon
            className="h-10 w-10 text-danger font-medium p-1 rounded-md  cursor-pointer hover:bg-dark-danger hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105"
            onClick={() => setShowModal(true)}
          />
        </div>
      </header>

      <main>
        <figure>
          <img src={"https://placehold.co/600X400"} alt="Album" />
        </figure>
        <div className="my-2 flex flex-col gap-0.5 items-end">
          <p className="text-red-500 font-thin text-xs line-through">
            {currencyFormatter(post.oldPrice)}
          </p>
          <p className="text-accent font-semibold text-xl">
            {currencyFormatter(post.promotionPrice)}
          </p>
        </div>
        <p>{post.description}</p>

        <AddressCard address={post.address} />
      </main>
    </div>
  );
};

export default FullPostCard;
