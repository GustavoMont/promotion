/* eslint-disable @next/next/no-img-element */
import { Post } from "@/models/Post";
import { currencyFormatter } from "@/utils/formatter";
import React from "react";

interface Props {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={"https://placehold.co/600X400"} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.description}</p>
        <div className="my-2 flex flex-col gap-0.5 items-end">
          <p className="text-red-500 font-thin text-xs line-through">
            {currencyFormatter(post.oldPrice)}
          </p>
          <p className="text-accent font-semibold text-xl">
            {currencyFormatter(post.promotionPrice)}
          </p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Ver mais</button>
        </div>
      </div>
    </div>
  );
};
