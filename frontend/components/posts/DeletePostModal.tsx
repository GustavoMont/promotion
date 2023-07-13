import React from "react";
import { Button } from "../common/Button";
import { deletePost } from "@/services/postService";
import { Post } from "@/models/Post";
import { toast } from "react-toastify";

type DeletePostModalProps = {
  setShowDeleteModal: (value: boolean) => void;
  post: Post;
};

const DeletePostModal = ({
  setShowDeleteModal,
  post,
}: DeletePostModalProps) => {
  const resetModalState = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteClick = async () => {
    try {
      await deletePost(post.id);
      toast.success("Post excluído");
      resetModalState();
    } catch (error) {
      toast.error("Erro ao excluir publicação");
    }
  };
  const handleCancelClick = () => {
    resetModalState();
  };
  return (
    <dialog id="my_modal_3" className="modal" open>
      <form method="dialog" className="modal-box">
        <button
          onClick={handleCancelClick}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-xl text-center text-red-500">
          Cuidado! Essa ação é irreversível.
        </h3>
        <p className="py-4">
          Tem certeza que deseja excluir{" "}
          <span className="text-red-700 font-semibold">permanentemente</span> a
          postagem?
        </p>
        <div className="flex gap-2 justify-end">
          <Button color="neutral" onClick={handleCancelClick} rounded>
            Cancelar
          </Button>
          <Button onClick={handleDeleteClick} color="danger" rounded>
            Excluir
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default DeletePostModal;
