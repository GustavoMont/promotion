import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { GetServerSideProps } from "next";
import { getToken, getUserToken } from "@/utils/auth";
import {
  CreateUser,
  createColaborator,
  listColaborators,
} from "@/services/userService";
import { useAuth } from "@/context/AuthContext";
import { Alert } from "@/components/common/Alert";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Collapse } from "@/components/common/Collapse";
import { TextInput } from "@/components/form/TextInput";
import { useForm } from "react-hook-form";
import { Button } from "@/components/common/Button";
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DeletUserModal } from "@/components/dashboard/users/DeletUserModal";
import { User } from "@/models/User";
import { UserTable } from "@/components/dashboard/users/UserTable";

const Colaboradores: React.FC = () => {
  const { user } = useAuth();
  const { data: colaborators } = useQuery(["colaborators"], () =>
    listColaborators()
  );
  const othersColaborators = colaborators?.filter(({ id }) => id != user?.id);
  const { register, handleSubmit } = useForm<CreateUser>({
    defaultValues: {
      role: 1,
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedUser(null);
    }
  }, [isModalOpen]);

  const closeModal = () => setIsModalOpen(false);
  const onClickDelete = (user: User) => {
    setIsModalOpen(true);
    setSelectedUser(user);
  };
  const queryClient = useQueryClient();

  const { mutate: onSubmit } = useMutation(handleSubmit(createColaborator), {
    onSuccess() {
      toast.success("Colaborador adicionado com sucesso");
      return queryClient.invalidateQueries(["colaborators"]);
    },
    onError() {
      toast.error("Ocorreu um erro ao adicionar um usuário");
    },
  });

  return (
    <DashboardLayout>
      {isModalOpen && selectedUser ? (
        <DeletUserModal user={selectedUser} handleCancelClick={closeModal} />
      ) : null}
      <div className="flex flex-col gap-5">
        <div className="self-end">
          <Collapse
            className="self-end border border-emerald-700"
            title="Adicionar colaborador"
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
                Criar colaborador
              </Button>
            </form>
          </Collapse>
        </div>
        {othersColaborators?.length ? (
          <UserTable
            onClickDelete={onClickDelete}
            colaborators={othersColaborators}
          />
        ) : (
          <Alert
            content="Não há outros colaboradores"
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

  await queryClient.prefetchQuery(["colaborators"], () =>
    listColaborators(ctx)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Colaboradores;
