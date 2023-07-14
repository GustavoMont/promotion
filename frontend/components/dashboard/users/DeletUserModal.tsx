import { Button } from "@/components/common/Button";
import { User } from "@/models/User";
import { deleteUser } from "@/services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";

type Props = {
  user: User;
  handleCancelClick(): void;
};

export const DeletUserModal: React.FC<Props> = ({
  handleCancelClick,
  user,
}) => {
  const queryClient = useQueryClient();
  const { mutate: onConfirm, isLoading } = useMutation(deleteUser, {
    onSuccess() {
      toast.success("Usuário deletado com sucesso");
      return queryClient.invalidateQueries(["colaborators"]);
    },
    onError() {
      toast.success("Erro ao deletar o usuário");
    },
  });

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
          conta do{"  "}
          <span className="font-medium">
            {user.name}: {user.email}
          </span>
          ?
        </p>
        <div className="flex gap-2 justify-end">
          <Button color="neutral" onClick={handleCancelClick} rounded>
            Cancelar
          </Button>
          <Button
            isLoading={isLoading}
            onClick={() => onConfirm(user.id)}
            color="danger"
            rounded
          >
            Excluir
          </Button>
        </div>
      </form>
    </dialog>
  );
};
