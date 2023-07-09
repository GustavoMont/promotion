import { Post } from "@/models/Post";
import React, { useState } from "react";
import DeletePostModal from "./DeletePostModal";
import { Button } from "../common/Button";
import EditPostModal from "./EditPostModal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

type PersonalPostProps = {
  post: Post;
};

const PersonalPosts = ({ post }: PersonalPostProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <div className="p-8 card card-side bg-base-100 shadow-xl max-w-[400px] max-h-[400px] w-full h-full">
      {showDeleteModal ? (
        <DeletePostModal setShowDeleteModal={setShowDeleteModal} />
      ) : null}

      {showEditModal ? (
        <EditPostModal setShowEditModal={setShowEditModal} post={post} />
      ) : null}

      <figure>
        <img
          src={
            "https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          }
          alt="Post image"
          className="w-[100px] rounded"
        />
      </figure>
      <div className="flex flex-col justify-between rounded-r-xl w-full p-2">
        <h2 className="font-bold text-xl text-start">{post.title}</h2>
        <div className="flex justify-between">
          <p className=" text-xs text-gray-600 flex items-end">
            Postado à 3 dias
          </p>
          <div>
            <Button color="none" onClick={() => setShowEditModal(true)}>
              <PencilSquareIcon
                title="Editar"
                className="h-10 w-10 text-yellow-500 font-medium p-1 rounded-md  cursor-pointer hover:bg-yellow-600 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105"
              />
            </Button>

            <Button color="none" onClick={() => setShowDeleteModal(true)}>
              <TrashIcon
                title="Excluir"
                className="h-10 w-10 text-danger font-medium p-1 rounded-md  cursor-pointer hover:bg-dark-danger hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPosts;
