/* eslint-disable @next/next/no-img-element */
import { Post } from "@/models/Post";
import { currencyFormatter } from "@/utils/formatter";
import React, { useState } from "react";
import AddressCard from "./address/AddressCard";
import { useForm } from "react-hook-form";
import { Avatar } from "../user/Avatar";

type FullPostCardProps = {
  post: Post;
};

const FullPostCard = ({ post }: FullPostCardProps) => {
  const { register, reset } = useForm();
  const [showModal, setShowModal] = useState(false);

  const handleCancelReport = () => {
    setShowModal(false);
    reset();
  };

  return (
    <div className="h-full p-4 max-w-[635px]">
      {showModal ? (
        <dialog id="reportModal" className="modal" open>
          <form method="dialog" className="modal-box flex flex-col">
            <button
              onClick={handleCancelReport}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg mb-3">Denuncia</h3>
            <textarea
              {...register("report")}
              className="textarea textarea-error"
              placeholder="Descreva aqui o motivo da denuncia"
            />

            <div className="modal-action">
              <button type="submit" className="btn-success rounded p-2">
                Enviar
              </button>
              <button
                onClick={handleCancelReport}
                className="btn-error rounded p-2"
              >
                Fechar
              </button>
            </div>
          </form>
        </dialog>
      ) : null}

      <header className="flex justify-between m-2 items-start sm:flex-row sm:border-black">
        <div className="flex gap-2">
          <Avatar img={post.user.avatar ?? undefined} />
          <div>{post?.user ? post?.user?.name : "Nome de usuário"}</div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <h2 className="card-title">{post.title}</h2>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            className="w-6 h-6 hover:cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <path
              fillRule="evenodd"
              d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z"
              clipRule="evenodd"
            />
          </svg> */}
        </div>
      </header>

      <main>
        <figure>
          <img src={post.image} alt={post.title} />
        </figure>
        <div className="my-2 flex flex-col gap-0.5 items-end">
          <p className="text-red-500 font-thin text-xs line-through">
            {currencyFormatter(post.oldPrice)}
          </p>
          <p className="text-accent font-semibold text-xl">
            {currencyFormatter(post.promotionPrice)}
          </p>
        </div>
        <p>{post.description}</p>

        <AddressCard address={post.address} />
      </main>
    </div>
  );
};

export default FullPostCard;
