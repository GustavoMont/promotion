import { Title } from "@/components/Typograph/Title";
import { Select } from "@/components/form/Select";
import { TextInput } from "@/components/form/TextInput";
import { City } from "@/models/Address";
import { CreatePost, createPost, listCities } from "@/services/postService";
import { authCookieKey } from "@/utils/auth";
import { PlusIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  cities: City[];
}

const AddPost: React.FC<Props> = ({ cities }) => {
  const { register, handleSubmit } = useForm<CreatePost>();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const onSubmit = async (data: CreatePost) => {
    try {
      setIsCreating(true);
      await createPost({
        ...data,
        oldPrice: data.oldPrice,
        promotionPrice: data.promotionPrice,
      });
      toast.success("Seu post foi publicado com sucesso");
      router.push("/");
    } catch (error) {
      toast.error("Ocorreu um erro ao fazer a publicação");
      setIsCreating(false);
    }
  };

  useEffect(() => {
    setIsCreating(false);
  }, []);

  return (
    <main className="py-5">
      <Title className="text-primary mb-5">Criar novo post</Title>
      <form
        className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4 md:pt-5">
          <TextInput
            placeholder="Título da publicação"
            register={register("title")}
            label="Título"
          />
          <textarea
            {...register("description")}
            placeholder="Descreve a promoção"
            className="textarea textarea-bordered textarea-lg w-full md:h-full"
          ></textarea>
          <div className="flex gap-4">
            <TextInput
              type="number"
              placeholder="Preço antes da promoção"
              register={register("oldPrice")}
              label="Preço antigo:"
            />
            <TextInput
              type="number"
              placeholder="Preço da promoção"
              register={register("promotionPrice")}
              label="Preço da promoção:"
            />
          </div>
        </div>
        <div className="divider md:hidden">
          <Title level="h4">Adicione o endereço</Title>
        </div>
        <div className="flex flex-col gap-4">
          <Select
            register={register("address.cityId")}
            label="Cidade:"
            list={cities.map(({ id, name }) => ({ name, value: id }))}
          />
          <TextInput
            register={register("address.street")}
            placeholder="campo não obrigatório"
            label="Rua:"
          />
          <TextInput
            register={register("address.neighborhood")}
            placeholder="campo não obrigatório"
            label="Bairro:"
          />
          <TextInput
            register={register("address.number")}
            placeholder="campo não obrigatório"
            label="Número:"
          />
        </div>
        <div className="w-full flex justify-end md:justify-center col-start-1 col-end-3 mt-5 md:mt-0">
          <button
            type="submit"
            disabled={isCreating}
            className="btn btn-primary btn-wide text-white"
          >
            {isCreating ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <PlusIcon className="w-6" />
            )}
            Postar
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddPost;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { [authCookieKey]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  const cities = await listCities(ctx);

  return { props: { cities } };
};
