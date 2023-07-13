import api, { serverSideAPi } from "@/config/api";
import { AccessToken } from "@/models/Auth";
import { User } from "@/models/User";
import { ctxType } from "@/types/Ctx";
import { AxiosResponse } from "axios";

export interface Login {
  email: string;
  password: string;
}

export const login = async ({ email, password }: Login) => {
  const { data } = await api.post<AccessToken>("/users/login", {
    email,
    password,
  });
  return data;
};

export interface CreateColaborator {
  name: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  role: number;
}

export const createColaborator = async (body: CreateColaborator) => {
  const { data } = await api.post<
    unknown,
    AxiosResponse<User>,
    CreateColaborator
  >("/users/team", body);
  return data;
};

export const getCurrentUser = async () => {
  const { data: user } = await api.get<User>("/users/me");
  return user;
};

export const listColaborators = async (ctx: ctxType | null = null) => {
  const requester = ctx ? serverSideAPi(ctx) : api;
  const { data } = await requester.get<User[]>("/users?role=1");
  return data;
};
