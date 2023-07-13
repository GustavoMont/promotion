import React, { useEffect, useState } from "react";
import { Button } from "../common/Button";
import { useForm } from "react-hook-form";
import { Select } from "../form/Select";
import { Reason } from "@/models/Complaints";
import api from "@/config/api";
import { Post } from "@/models/Post";
import { CreateComplaint, createComplaint } from "@/services/complaintService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type ReportPostModalProps = {
  setShowModal: (value: boolean) => void;
  post: Post;
};

export default function ReportPostModal({
  setShowModal,
  post,
}: ReportPostModalProps) {
  const [reasonTypes, setReasonTypes] = useState<Reason[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<CreateComplaint>({
    defaultValues: {
      postId: post.id,
    },
  });

  const onSubmit = async (data: CreateComplaint) => {
    try {
      setIsLoading(true);
      await createComplaint(data);
      setIsLoading(false);
      handleCancelReport();
    } catch (error: unknown) {
      const apiError = error as AxiosError<{ message: string }>;
      setIsLoading(false);
      toast.error(apiError.response?.data?.message ?? "Ocorreu um erro");
    }
  };

  const handleCancelReport = () => {
    reset();
    setShowModal(false);
  };

  useEffect(() => {
    const getReasons = async () => {
      const { data } = await api.get<Reason[]>(`/complaints/reason-types`);
      setReasonTypes(data);
    };
    let mounted = true;
    if (mounted) {
      getReasons();
    }

    return () => {
      setReasonTypes([]);
      mounted = false;
    };
  }, []);

  return (
    <dialog id="reportModal" className="modal" open>
      <form
        method="dialog"
        className="modal-box flex flex-col "
        onSubmit={handleSubmit(onSubmit)}
      >
        <button
          onClick={handleCancelReport}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <Select
          register={register("reason")}
          label="Por qual motivo?"
          list={reasonTypes.map(({ name, reason: value }) => ({ name, value }))}
        />
        <h3 className="font-bold text-lg mb-3">Denuncia</h3>
        <textarea
          {...register("explain")}
          className="textarea textarea-error"
          placeholder="Descreva aqui o motivo da denuncia"
          rows={5}
        />

        <div className="modal-action">
          <Button
            type="reset"
            onClick={handleCancelReport}
            rounded
            color="danger"
          >
            Fechar
          </Button>
          <Button type="submit" rounded color="primary" isLoading={isLoading}>
            Enviar
          </Button>
        </div>
      </form>
    </dialog>
  );
}
