import { Post } from "@/models/Post";
import React from "react";

type PersonalPostProps = {
  post: Post;
};

const PersonalPosts = ({ post }: PersonalPostProps) => {
  return (
    <div className="p-8 card card-side bg-base-100 shadow-xl max-w-[400px] max-h-[400px] w-full h-full ">
      <figure>
        <img
          src={
            "https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          }
          alt="Post image"
          className="w-[100px]"
        />
      </figure>
      <div className="flex flex-col justify-between border border-black rounded-r-xl w-full p-2">
        <h2 className="font-bold text-xl text-start">{post.title}</h2>
        <div className="flex justify-between">
          <p className=" text-xs text-gray-600 flex items-end">
            Postado à 3 dias
          </p>
          <div>
            <h2 className="font-medium p-1 rounded-md text-red-500 cursor-pointer hover:bg-red-500  hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
              Excluir
            </h2>
            <h2 className="font-medium p-1 rounded-md text-yellow-500 cursor-pointer hover:bg-yellow-500  hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
              Editar
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPosts;
