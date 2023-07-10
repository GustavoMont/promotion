/* eslint-disable @next/next/no-img-element */
import { Post } from "@/models/Post";
import { currencyFormatter } from "@/utils/formatter";
import Link from "next/link";
import React from "react";

interface Props {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <div className="p-4 card lg:card-side bg-base-100 shadow-xl rounded-t-lg border-t-8 border-t-primary ">
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
        <Link
          href={`/postagem-completa/${post.id}`}
          className="card-actions justify-end"
        >
          <button className="btn btn-primary">Ver mais</button>
        </Link>
      </div>
    </div>
  );
};
