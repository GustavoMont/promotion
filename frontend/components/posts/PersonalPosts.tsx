/* eslint-disable @next/next/no-img-element */
import { Post } from "@/models/Post";
import React, { useState } from "react";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
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

  // const formattedDate = formatDistance(
  //   subDays(new Date(), post.updatedAt),
  //   new Date(),
  //   {
  //     addSuffix: true,
  //   }
  // );

  return (
    <div className="rounded-t-lg border-t-8 border-t-primary p-4 rounded card-side bg-base-100       shadow-xl max-w-[400px] max-h-[400px] w-full h-full">
      {showDeleteModal ? (
        <DeletePostModal setShowDeleteModal={setShowDeleteModal} />
      ) : null}

      {showEditModal ? (
        <EditPostModal setShowEditModal={setShowEditModal} post={post} />
      ) : null}

      <div className="flex flex-col">
        <Title className="p-2 font-bold text-xl text-start hover:underline">
          {post.title}
        </Title>

        <figure className="w-full flex justify-center items-start">
          <img
            src={post.image}
            alt="Post image"
            className="w-full max-h-[200px] rounded p-2 object-fill"
          />
        </figure>

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
            <div
              className="hover:underline hover:text-yellow-500 hover:font-medium"
              onClick={() => setShowEditModal(true)}
            >
              <PencilSquareIcon
                title="Editar"
                className="h-10 w-10  font-medium p-1 rounded-md cursor-pointer"
              />
              <p className="text-xs">editar</p>
            </div>

            <div
              onClick={() => setShowDeleteModal(true)}
              className="hover:underline hover:text-danger hover:font-medium"
            >
              <TrashIcon
                title="Excluir"
                className="h-10 w-10font-medium p-1 rounded-md  cursor-pointer "
              />
              <p className="text-xs">excluir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPosts;
