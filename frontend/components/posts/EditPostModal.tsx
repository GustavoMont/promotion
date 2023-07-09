import React from "react";
import { Button } from "../common/Button";
import { Post } from "@/models/Post";
import Label from "../common/Label";
import AddressCard from "./address/AddressCard";
import { Select } from "../form/Select";

type EditPostModalProps = {
  setShowEditModal: (value: boolean) => void;
  post: Post;
};

const EditPostModal = ({ setShowEditModal, post }: EditPostModalProps) => {
  const resetModalState = () => {
    setShowEditModal(false);
  };

  const handleSaveClick = () => {
    resetModalState();
  };
  const handleCancelClick = () => {
    resetModalState();
  };

  const cities = [
    { name: "Pirapora", value: 1 },
    { name: "Buritizeiro", value: 2 },
    { name: "Varzea da Palma", value: 3 },
  ];

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

        <form className="gap-4 p-6 items-start grid grid-cols-1 md:max-w-[800px] md:grid-cols-2 ">
          <div className="flex flex-col  justify-center items-start">
            <Label htmlFor="title">Titulo</Label>
            <input
              type="text"
              id="title"
              defaultValue={post?.title}
              placeholder="Digite aqui"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col  justify-center items-start">
            <Label htmlFor="description">Descrição</Label>
            <textarea
              id="description"
              className="textarea textarea-bordered w-full  max-w-xs"
              placeholder="Descrição"
              defaultValue={post.description}
              rows={4}
            />
          </div>

          <div className="flex flex-col justify-center items-start">
            <Label htmlFor="oldPrice">Preço antigo</Label>
            <input
              id="oldPrice"
              min={0}
              type="number"
              defaultValue={post?.oldPrice}
              placeholder="R$"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col justify-center items-start">
            <Label htmlFor="promotionPrice">Preço promocional</Label>
            <input
              id="promotionPrice"
              min={0}
              type="number"
              defaultValue={post?.promotionPrice}
              placeholder="R$"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-lg">Endereço</h1>

            <div className="flex flex-col  justify-center items-start">
              <Label>Cidade</Label>
              <Select list={cities}></Select>
            </div>

            <div className="flex flex-col  justify-center items-start">
              <Label htmlFor="street">Rua</Label>
              <input
                id="street"
                type="text"
                defaultValue={post?.address.street}
                placeholder="Rua"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="flex flex-col  justify-center items-start">
              <Label htmlFor="neighborhood">Bairro</Label>
              <input
                id="neighborhood"
                type="text"
                defaultValue={post?.address.neighborhood}
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
                defaultValue={post?.address.number}
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
              className="file-input w-full max-w-xs"
            />
          </div>
        </form>
        <div className="flex gap-2 justify-center items-center">
          <Button onClick={handleSaveClick} color="primary" rounded>
            Salvar
          </Button>
          <Button onClick={handleCancelClick} color="danger" rounded>
            Cancelar
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default EditPostModal;
