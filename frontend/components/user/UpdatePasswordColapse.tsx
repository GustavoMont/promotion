import { User } from "@/models/User";
import React from "react";
import { Collapse } from "../common/Collapse";
import { useForm } from "react-hook-form";
import { UpdatePassword, updatePassword } from "@/services/userService";
import { TextInput } from "../form/TextInput";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Button } from "../common/Button";

interface Props {
  user: User;
}

export const UpdatePasswordColapse: React.FC<Props> = ({ user }) => {
  const { register, handleSubmit } = useForm<UpdatePassword>();
  const onSubmit = async (data: UpdatePassword) => {
    await updatePassword(user.id, data);
  };
  const { mutate, isLoading } = useMutation(handleSubmit(onSubmit), {
    onSuccess() {
      toast.success("Senha atualizada com sucesso");
    },
    onError(err: AxiosError<{ message: string }>) {
      toast.error(err.response?.data.message);
    },
  });
  return (
    <Collapse title="Mudar senha" className="text-red-400 collapse-arrow">
      <div className="flex flex-col gap-3 items-end">
        <div className="flex flex-col gap-2 self-stretch">
          <TextInput
            isPassword
            label="Senha atual:"
            register={register("oldPassword")}
          />
          <TextInput
            isPassword
            label="Nova senha:"
            register={register("password")}
            helpText="A senha deve ter no mínimo 8 caracteres, uma letra e um número"
          />
          <TextInput
            isPassword
            label="Confirmar senha:"
            register={register("confirmPassword")}
          />
        </div>
        <Button color="danger" onClick={mutate} isLoading={isLoading}>
          Atualizar senha
        </Button>
      </div>
    </Collapse>
  );
};
