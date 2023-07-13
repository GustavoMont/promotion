import api from "@/config/api";
import { Complaint } from "@/models/Complaints";
import { AxiosResponse } from "axios";

export interface CreateComplaint {
  reason: number;
  explain?: string;
  postId: number;
}

export const createComplaint = async ({ reason, ...body }: CreateComplaint) => {
  const { data } = await api.post<
    unknown,
    AxiosResponse<Complaint>,
    CreateComplaint
  >(`/complaints`, {
    ...body,
    reason: +reason,
  });

  return data;
};

export const deleteComplaint = async (complaintId: number) => {
  await api.delete(`complaints/${complaintId}`);
};
