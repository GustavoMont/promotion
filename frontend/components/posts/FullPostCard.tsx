/* eslint-disable @next/next/no-img-element */
import { Post } from "@/models/Post";
import { currencyFormatter } from "@/utils/formatter";
import React, { useState } from "react";
import AddressCard from "./address/AddressCard";
import ReportPostModal from "./ReportPostModal";
import { FlagIcon } from "@heroicons/react/24/outline";
import { FlagIcon as SolidFlagIcon } from "@heroicons/react/24/solid";
import { Title } from "../Typograph/Title";
import { useAuth } from "@/context/AuthContext";
import { deleteComplaint } from "@/services/complaintService";
import { useQueryClient } from "@tanstack/react-query";

type FullPostCardProps = {
  post: Post;
};

const FullPostCard = ({ post }: FullPostCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const userComplaint = post.complaints.find(
    ({ userId }) => userId === user?.id
  );
  const userHasComplainted = !!userComplaint;
  const openComplaintModal = () => setShowModal(true);
  const complaintIcon = userHasComplainted ? (
    <SolidFlagIcon className="w-6" />
  ) : (
    <FlagIcon className="w-6" />
  );
  const queryClient = useQueryClient();
  const handleClickComplaint = async () => {
    if (userHasComplainted) {
      await deleteComplaint(userComplaint.id);
      queryClient.invalidateQueries(["post", post.id.toString()]);
    } else {
      openComplaintModal();
    }
  };

  return (
    <div className="w-full max-w-[1000px] grid md:grid-cols-2 gap-3 justify-center items-center">
      <div className="flex flex-col p-2 gap-8 w-full h-full">
        {showModal ? (
          <ReportPostModal post={post} setShowModal={setShowModal} />
        ) : null}

        <div className="flex flex-col gap-4 bg-white  p-4 shadow rounded-t-lg border-t-8 border-t-primary w-full max-w-[500px] h-full">
          <div className="flex gap-2 items-center justify-between">
            <Title className="underline">{post.title}</Title>
            <div
              className="flex flex-col text-danger items-center justify-center gap-1.5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:underline cursor-pointer"
              onClick={handleClickComplaint}
            >
              {complaintIcon}
              <p className="text-xs  text-center">
                {userHasComplainted ? "Remover denúncia" : "Denunciar"}{" "}
              </p>
            </div>
          </div>
          <figure className="flex items-center justify-center">
            <img
              className="rounded max-w-[300px] object-contain"
              src={post.image}
              alt="Album"
            />
          </figure>

          <div className="my-2 p-2 flex gap-2 justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-red-500 font-thin text-xs line-through">
                {currencyFormatter(post.oldPrice)}
              </p>
              <p className="text-accent font-semibold text-xl">
                {currencyFormatter(post.promotionPrice)}
              </p>
            </div>

            <div className="flex gap-8">
              {/* <HandThumbUpIcon className="w-[30px] text-primary" /> */}
              <div className="flex gap-1 items-center text-danger">
                <p className="pt-0.5 font-medium">{post.complaints.length}</p>
                {complaintIcon}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-white p-4 shadow rounded-t-lg border-t-8 border-t-primary w-full max-w-[500px] h-full max-h-[500px]">
          <div>
            <Title>Mais informações</Title>
            <p>{post.description}</p>
          </div>
          <AddressCard address={post.address} />
        </div>
      </div>
    </div>
  );
};

export default FullPostCard;
