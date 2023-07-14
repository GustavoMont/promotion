import { Alert } from "@/components/common/Alert";
import { Button } from "@/components/common/Button";
import { Collapse } from "@/components/common/Collapse";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { DeletUserModal } from "@/components/dashboard/users/DeletUserModal";
import { UserTable } from "@/components/dashboard/users/UserTable";
import { TextInput } from "@/components/form/TextInput";
import { User } from "@/models/User";
import {
  CreateUser,
  createUser,
  listColaborators,
  listUsers,
} from "@/services/userService";
import { getToken, getUserToken } from "@/utils/auth";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Usuarios = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: users } = useQuery(["users"], () => listUsers());
  const { register, handleSubmit } = useForm<CreateUser>({
    defaultValues: {
      role: 0,
    },
  });
  const queryClient = useQueryClient();
  const { mutate: onSubmit } = useMutation(handleSubmit(createUser), {
    onSuccess() {
      toast.success("Usuário criado com sucesso");
      return queryClient.invalidateQueries(["usuarios"]);
    },
    onError() {
      toast.error("Erro ao criar usuário");
    },
  });
  const closeModal = () => setIsModalOpen(false);
  const onClickDelete = (user: User) => {
    setIsModalOpen(true);
    setSelectedUser(user);
  };
  return (
    <DashboardLayout>
      {isModalOpen && selectedUser ? (
        <DeletUserModal user={selectedUser} handleCancelClick={closeModal} />
      ) : null}
      <div className="flex flex-col gap-5">
        <div className="self-end">
          <Collapse
            className="self-end border border-emerald-700"
            title="Adicionar usuário"
          >
            <div className="divider"></div>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <TextInput
                register={register("name")}
                label="Nome:"
                placeholder="insira o nome..."
              />
              <TextInput
                register={register("lastName")}
                label="Sobrenome:"
                placeholder="insira o sobrenome..."
              />
              <TextInput
                register={register("email")}
                label="Email:"
                placeholder="insira o e-mail..."
              />
              <TextInput
                register={register("password")}
                label="Senha:"
                placeholder="insira a senha..."
                isPassword
              />
              <TextInput
                register={register("confirmPassword")}
                label="Confirmar senha:"
                placeholder="confirmar enha..."
                isPassword
              />
              <Button type="submit" className="mt-4">
                Criar usuário
              </Button>
            </form>
          </Collapse>
        </div>
        {users?.length ? (
          <UserTable onClickDelete={onClickDelete} colaborators={users} />
        ) : (
          <Alert
            content="Não há usuários"
            icon={<InformationCircleIcon className="w-8" />}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = getToken(ctx);
  const redirectResponse = {
    redirect: {
      destination: "/404",
      permanent: false,
    },
  };
  if (!token) {
    return redirectResponse;
  }
  const user = getUserToken(token);
  if (!user) {
    return redirectResponse;
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["users"], () => listColaborators(ctx));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Usuarios;
