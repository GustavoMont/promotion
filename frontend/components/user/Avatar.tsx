/* eslint-disable @next/next/no-img-element */
import { UserIcon } from "@heroicons/react/24/outline";
import React from "react";

interface Props {
  size?: `w-${number}`;
  img?: string;
}

export const Avatar: React.FC<Props> = ({ size, img }) => {
  const avatarSize = size || "w-24";
  return (
    <div className="avatar placeholder">
      {img ? (
        <div className="w-10 rounded-full">
          <img src={img} alt="foto de perfil" />
        </div>
      ) : (
        <div
          className={`bg-neutral-focus text-neutral-content rounded-full ${avatarSize}`}
        >
          <UserIcon className={"w-6"} />
        </div>
      )}
    </div>
  );
};
