import React from "react";
import { Button } from "../common/Button";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UpdateUserFrom, updateUser } from "@/services/userService";
import { User } from "@/models/User";
import { TextInput } from "../form/TextInput";
import { FileInput } from "../form/FileInput";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { UpdatePasswordColapse } from "./UpdatePasswordColapse";

interface Props {
  handleCancelClick(): void;
  user: User;
}

export const EditProfileModal: React.FC<Props> = ({
  handleCancelClick,
  user,
}) => {
  const { setUser } = useAuth();
  const { register, handleSubmit } = useForm<UpdateUserFrom>({
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
    },
  });

  const { mutate, isLoading } = useMutation(
    (body: UpdateUserFrom) => updateUser(user.id, body),
    {
      onSuccess(data: User) {
        setUser(data);
        handleCancelClick();
        toast.success("Perfil atualizado com sucesso");
      },
      onError() {
        toast.error("Ocorreu um eror ao atualizar seu perfil");
      },
    }
  );

  const onSubmit = async (data: UpdateUserFrom) => {
    return await mutate(data);
  };

  return (
    <dialog className="modal" open>
      <form
        method="dialog"
        onSubmit={handleSubmit(onSubmit)}
        className="modal-box"
      >
        <button
          type="reset"
          onClick={handleCancelClick}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-xl text-center text-primary">
          Atualizar perfil.
        </h3>
        <div className="flex flex-col gap-4">
          <TextInput label="Nome:" register={register("name")} />
          <TextInput label="Sobrenome:" register={register("lastName")} />
          <FileInput register={register("avatar")} label="Foto de perfil" />
        </div>

        <UpdatePasswordColapse user={user} />

        <div className="flex gap-2 mt-5 justify-end">
          <Button color="neutral" onClick={handleCancelClick} rounded>
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading} color="primary" rounded>
            Atualizar
          </Button>
        </div>
      </form>
    </dialog>
  );
};
