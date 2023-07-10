/* eslint-disable @next/next/no-img-element */
import { Post } from "@/models/Post";
import React, { useState } from "react";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Title } from "../Typograph/Title";
import { currencyFormatter } from "@/utils/formatter";

type PersonalPostProps = {
  post: Post;
};

const PersonalPosts = ({ post }: PersonalPostProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <div className="rounded-t-lg border-t-8 border-t-primary  p-4 rounded card-side bg-base-100       shadow-xl max-w-[400px] max-h-[400px] w-full h-full">
      {showDeleteModal ? (
        <DeletePostModal setShowDeleteModal={setShowDeleteModal} />
      ) : null}

      {showEditModal ? (
        <EditPostModal setShowEditModal={setShowEditModal} post={post} />
      ) : null}

      <div>
        <Title className="font-bold text-xl text-start underline">
          {post.title}
        </Title>

        <figure className="w-full flex items-center justify-center">
          <img
            src={
              "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            alt="Post image"
            className="w-full max-h-[200px] rounded p-2"
          />
        </figure>

        <div className="flex justify-between rounded-r-xl w-full p-2">
          <div className="my-2 flex flex-col gap-2 justify-between items-start">
            <div className="flex flex-col gap-1">
              <p className="text-red-500 font-thin text-xs line-through">
                {currencyFormatter(post.oldPrice)}
              </p>
              <p className="text-accent font-semibold text-xl">
                {currencyFormatter(post.promotionPrice)}
              </p>
            </div>
            <p className=" text-xs text-gray-600 flex items-end">
              Postado à 3 dias
            </p>
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
