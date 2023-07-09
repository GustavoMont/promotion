import React, { useState } from "react";
import { Button } from "../common/Button";

type DeletePostModalProps = {
  setShowDeleteModal: (value: boolean) => void;
};

const DeletePostModal = ({ setShowDeleteModal }: DeletePostModalProps) => {
  const resetModalState = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteClick = () => {
    resetModalState();
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
        <h3 className="font-bold text-lg">
          Cuidado! Essa ação é irreversível.
        </h3>
        <p className="py-4">
          Tem certeza que deseja excluir{" "}
          <span className="text-red-500 font-semibold">permanentemente</span> a
          postagem?
        </p>
        <div className="flex gap-2">
          <Button onClick={handleDeleteClick} color="danger" rounded>
            Excluir
          </Button>
          <Button onClick={handleCancelClick} rounded>
            Cancelar
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default DeletePostModal;
