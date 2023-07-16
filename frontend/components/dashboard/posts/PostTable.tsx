import { Post } from "@/models/Post";
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Popover } from "react-tiny-popover";
import { ComplaintsSummary } from "./ComplaintsSummary";

type TableProps = {
  posts: Post[];
};

export const PostTable = ({ posts }: TableProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Denúncias</th>
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

              <td>
                <Popover
                  isOpen={isPopoverOpen}
                  positions={["top", "bottom", "left", "right"]}
                  content={
                    <ComplaintsSummary
                      close={() => setIsPopoverOpen(false)}
                      complaints={post.complaints}
                    />
                  }
                >
                  <div
                    className="flex items-center justify-center gap-3"
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  >
                    <span className="font-medium text-lg">
                      {post.complaints.length}
                    </span>
                    <div className="tooltip" data-tip="Detalhes das denúncias">
                      <button>
                        <InformationCircleIcon className="w-6" />
                      </button>
                    </div>
                  </div>
                </Popover>
              </td>
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
