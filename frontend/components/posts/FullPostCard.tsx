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
import { Title } from "../Typograph/Title";

type FullPostCardProps = {
  post: Post;
};

const FullPostCard = ({ post }: FullPostCardProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col border-2 border-black h-full p-4 gap-8 md:flex-row w-full">
      {showModal ? <ReportPostModal setShowModal={setShowModal} /> : null}

      <div className="flex flex-col gap-4 bg-white  p-4 shadow rounded-t-lg border-t-8 border-t-primary w-full">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex flex-col items-center gap-1">
            <img
              src={post.user.avatar || "bonzi.jpg"}
              className="rounded-full w-[40px] h-[40px]"
            />
            <div>{post?.user ? post?.user?.name : "Nome de usuário"}</div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <FlagIcon
              className="h-10 w-10 text-danger font-medium p-1 rounded-md  cursor-pointer hover:bg-dark-danger hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105"
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
        <figure>
          <img
            className="max-w-[300px] max-h-[300px] rounded"
            src={"https://placehold.co/600X400"}
            alt="Album"
          />
        </figure>

        <div className="my-2 flex flex-col gap-2 justify-between items-start">
          <Title>{post.title}</Title>
          <div className="flex flex-col gap-1">
            <p className="text-red-500 font-thin text-xs line-through">
              {currencyFormatter(post.oldPrice)}
            </p>
            <p className="text-accent font-semibold text-xl">
              {currencyFormatter(post.promotionPrice)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white  p-4 shadow rounded-t-lg border-t-8 border-t-primary w-full">
        <div>
          <Title>Mais informações</Title>
          <p>{post.description}</p>
        </div>

        <AddressCard address={post.address} />
      </div>
    </div>
  );
};

export default FullPostCard;
