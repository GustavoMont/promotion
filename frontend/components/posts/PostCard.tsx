/* eslint-disable @next/next/no-img-element */
import { Post } from "@/models/Post";
import { currencyFormatter } from "@/utils/formatter";
import Link from "next/link";
import React from "react";

interface Props {
  post: Post;
}

const handleTextLimit = (text: string, limit: number) => {
  return text.length >= limit ? `${text.substring(0, limit)}...` : text;
};

export const PostCard: React.FC<Props> = ({ post }) => {
  const DESCRIPTION_LIMIT = 58;
  const TITLE_LIMIT = 40;

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={post.image} alt={post.title} />
      </figure>
      <div className="card-body  h-60 md:h-72">
        <h2 className="card-title">
          {handleTextLimit(post.title, TITLE_LIMIT)}
        </h2>
        <p>{handleTextLimit(post.description, DESCRIPTION_LIMIT)}</p>
        <div className="my-2 flex flex-col gap-0.5 items-end">
          <p className="text-red-500 font-thin text-xs line-through">
            {currencyFormatter(post.oldPrice)}
          </p>
          <p className="text-accent font-semibold text-xl">
            {currencyFormatter(post.promotionPrice)}
          </p>
        </div>
        <div className="card-actions justify-end">
          <Link
            href={`/postagem-completa/${post.id}`}
            className="card-actions justify-end"
          >
            <button className="btn btn-primary">Ver mais</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
