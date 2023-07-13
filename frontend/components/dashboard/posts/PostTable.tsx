import { Post } from "@/models/Post";
import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

type TableProps = {
  posts: Post[];
};

export const PostTable = ({ posts }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <th>{post.id}</th>
              <td>{post.title}</td>
              <td>{post.user.name}</td>
              <td>{String(post.updatedAt)}</td>
              <td>
                <TrashIcon className="text-danger w-[24px] h-[24px]" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
