import React from "react";
import { Button } from "../common/Button";
import { useForm } from "react-hook-form";

type ReportPostModalProps = {
  setShowModal: (value: boolean) => void;
};

export default function ReportPostModal({
  setShowModal,
}: ReportPostModalProps) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = ({ report }: any) => {
    alert(report);
  };

  const handleCancelReport = () => {
    setShowModal(false);
    reset();
  };

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
        <h3 className="font-bold text-lg mb-3">Denuncia</h3>
        <textarea
          {...register("report")}
          className="textarea textarea-error"
          placeholder="Descreva aqui o motivo da denuncia"
          rows={5}
        />

        <div className="modal-action">
          <Button rounded color="primary">
            Enviar
          </Button>
          <Button onClick={handleCancelReport} rounded color="danger">
            Fechar
          </Button>
        </div>
      </form>
    </dialog>
  );
}
