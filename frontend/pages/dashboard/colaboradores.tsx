import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { GetServerSideProps } from "next";
import { getToken, getUserToken } from "@/utils/auth";
import { CreateColaborator, listColaborators } from "@/services/userService";
import { User } from "@/models/User";
import { ColaboratorTable } from "@/components/dashboard/colaborators/ColaboratorTable";
import { useAuth } from "@/context/AuthContext";
import { Alert } from "@/components/common/Alert";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Collapse } from "@/components/common/Collapse";
import { TextInput } from "@/components/form/TextInput";
import { useForm } from "react-hook-form";
import { Button } from "@/components/common/Button";

interface Props {
  colaborators: User[];
}

const Colaboradores: React.FC<Props> = ({ colaborators }) => {
  const { user } = useAuth();
  const othersColaborators = colaborators.filter(({ id }) => id != user?.id);
  const { register, handleSubmit } = useForm<CreateColaborator>({
    defaultValues: {
      role: 1,
    },
  });

  const onSubmit = async (body: CreateColaborator) => {
    console.log(body);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="self-end">
          <Collapse
            className="self-end border border-emerald-700"
            title="Adicionar colaborador"
          >
            <div className="divider"></div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
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
                register={register("password")}
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
        {othersColaborators.length ? (
          <ColaboratorTable colaborators={othersColaborators} />
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

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
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
  const colaborators = await listColaborators(ctx);
  return { props: { colaborators } };
};

export default Colaboradores;
