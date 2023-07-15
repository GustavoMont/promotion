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

export interface CreateUser {
  name: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  role: number;
}

export const createColaborator = async (body: CreateUser) => {
  const { data } = await api.post<unknown, AxiosResponse<User>, CreateUser>(
    "/users/team",
    body
  );
  return data;
};

export const createUser = async (body: CreateUser) => {
  const { data: user } = await api.post(`/users`, body);
  return user;
};

type UpdateUser = Omit<
  User,
  "email" | "password" | "role" | "avatar" | "id"
> & {
  avatar: File | null;
};

export type UpdateUserFrom = Omit<UpdateUser, "avatar"> & {
  avatar: FileList;
};

export const updateUser = async (
  userId: number,
  { avatar: fileList, ...body }: UpdateUserFrom
) => {
  const avatar = fileList.item(0);
  const { data: user } = await api.put<
    unknown,
    AxiosResponse<User>,
    UpdateUser
  >(
    `/users/${userId}`,
    { ...body, avatar },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return user;
};

export const deleteUser = async (userId: number) => {
  await api.delete(`users/${userId}`);
};

export const getCurrentUser = async () => {
  const { data: user } = await api.get<User>("/users/me");
  return user;
};

export const listColaborators = async (ctx?: ctxType) => {
  const requester = ctx ? serverSideAPi(ctx) : api;
  const { data } = await requester.get<User[]>("/users?role=1");
  return data;
};

export const listUsers = async (ctx?: ctxType) => {
  const requester = ctx ? serverSideAPi(ctx) : api;
  const { data } = await requester.get<User[]>("/users?role=0");
  return data;
};
