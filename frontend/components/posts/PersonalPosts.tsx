/* eslint-disable @next/next/no-img-element */
import { Post } from "@/models/Post";
import React, { useState } from "react";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Title } from "../Typograph/Title";
import { currencyFormatter } from "@/utils/formatter";
import { differenceInDays, differenceInHours, parseISO } from "date-fns";

type PersonalPostProps = {
  post: Post;
};

const PersonalPosts = ({ post }: PersonalPostProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const days = differenceInDays(new Date(), parseISO(String(post.updatedAt)));
  const hours = differenceInHours(new Date(), parseISO(String(post.updatedAt)));

  return (
    <div className="rounded-t-lg border-t-8 border-t-primary p-4 rounded card-side bg-base-100 shadow-xl max-w-[400px]  w-full h-full">
      {showDeleteModal ? (
        <DeletePostModal post={post} setShowDeleteModal={setShowDeleteModal} />
      ) : null}

      {showEditModal ? (
        <EditPostModal setShowEditModal={setShowEditModal} post={post} />
      ) : null}

      <div className="flex flex-col gap-3">
        <Title className="p-2 font-bold text-xl text-start">{post.title}</Title>
        <div className="avatar">
          <div className="w-full max-h-[500px] rounded-lg">
            <img src={post.image} alt={post.title} />
          </div>
        </div>

        <div className="flex justify-between  rounded-r-xl w-full p-2">
          <div className="my-2 flex flex-col gap-2 justify-between items-start">
            <div className="flex flex-col gap-1">
              <p className="text-red-500 font-thin text-xs line-through">
                {currencyFormatter(post.oldPrice)}
              </p>
              <p className="text-accent font-semibold text-xl">
                {currencyFormatter(post.promotionPrice)}
              </p>
            </div>
            <div className=" text-xs text-gray-600 flex items-end">
              {days > 0 ? (
                <p>Postado à {days} dias atrás</p>
              ) : (
                <p>Postado à {hours} hora(s) atrás </p>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="hover:underline hover:text-danger hover:font-medium cursor-pointer"
            >
              <TrashIcon
                title="Excluir"
                className="h-10 w-10font-medium p-1 rounded-md"
              />
              <p className="text-xs">excluir</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPosts;
