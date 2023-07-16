import React from "react";
import { Button } from "../common/Button";
import { Post } from "@/models/Post";
import Label from "../common/Label";
import { Select } from "../form/Select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatePostForm, listCities, updatePost } from "@/services/postService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type EditPostModalProps = {
  setShowEditModal: (value: boolean) => void;
  post: Post;
};

const EditPostModal = ({ setShowEditModal, post }: EditPostModalProps) => {
  const { register, handleSubmit } = useForm<CreatePostForm>({
    defaultValues: {
      ...post,
      image: undefined,
    },
  });
  const onSubmit = async (data: CreatePostForm) => {
    return await updatePost(post.id, data);
  };
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(handleSubmit(onSubmit), {
    onSuccess() {
      toast.success("Post atualizado com sucesso");
      handleCancelClick();
      return queryClient.invalidateQueries(["profile-posts", post.userId]);
    },
    onError(error: AxiosError<{ message: string }>) {
      toast.error(error.response?.data.message);
    },
  });

  const resetModalState = () => {
    setShowEditModal(false);
  };

  const handleCancelClick = () => {
    resetModalState();
  };

  const { data: cities } = useQuery(["cities"], () => listCities());

  return (
    <dialog id="my_modal_3" className="modal" open>
      <form
        method="dialog"
        className="modal-box w-full max-w-[400px] grid grid-cols-1  md:max-w-[800px]"
      >
        <div>
          <button
            onClick={handleCancelClick}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg text-center">
            Edite sua publicação
          </h3>
        </div>

        <div className="gap-4 p-6 items-start grid grid-cols-1 md:max-w-[800px] md:grid-cols-2">
          <div className="flex flex-col  justify-center items-start">
            <Label htmlFor="title">Titulo</Label>
            <input
              {...register("title")}
              type="text"
              id="title"
              placeholder="Digite aqui"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col  justify-center items-start">
            <Label htmlFor="description">Descrição</Label>
            <textarea
              {...register("description")}
              id="description"
              className="textarea textarea-bordered w-full  max-w-xs"
              placeholder="Descrição"
              rows={4}
            />
          </div>

          <div className="flex flex-col justify-center items-start">
            <Label htmlFor="oldPrice">Preço antigo</Label>
            <input
              {...register("oldPrice")}
              id="oldPrice"
              min={0}
              type="number"
              placeholder="R$"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col justify-center items-start">
            <Label htmlFor="promotionPrice">Preço promocional</Label>
            <input
              {...register("promotionPrice")}
              id="promotionPrice"
              min={0}
              type="number"
              placeholder="R$"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-lg">Endereço</h1>
            {cities ? (
              <div className="flex flex-col  justify-center items-start">
                <Label>Cidade</Label>
                <Select
                  register={register("address.cityId")}
                  list={cities.map(({ name, id: value }) => ({
                    name,
                    value,
                  }))}
                ></Select>
              </div>
            ) : null}

            <div className="flex flex-col  justify-center items-start">
              <Label htmlFor="street">Rua</Label>
              <input
                {...register("address.street")}
                id="street"
                type="text"
                placeholder="Rua"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="flex flex-col  justify-center items-start">
              <Label htmlFor="neighborhood">Bairro</Label>
              <input
                id="neighborhood"
                type="text"
                {...register("address.street")}
                placeholder="Bairro"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="flex flex-col  justify-center items-start">
              <Label htmlFor="neighborhood">Número</Label>
              <input
                id="number"
                type="number"
                min={0}
                {...register("address.number")}
                placeholder="Número"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="postImage">Imagem da postagem</Label>
            <input
              id="postImage"
              type="file"
              {...register("image")}
              className="file-input w-full max-w-xs"
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <Button onClick={handleCancelClick} color="danger" rounded>
            Cancelar
          </Button>
          <Button
            onClick={mutate}
            color="primary"
            isLoading={isLoading}
            rounded
          >
            Salvar
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default EditPostModal;
