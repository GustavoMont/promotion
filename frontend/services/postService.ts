import api, { serverSideAPi } from "@/config/api";
import { City } from "@/models/Address";
import { Post } from "@/models/Post";
import { ctxType } from "@/types/Ctx";
import { AxiosResponse } from "axios";

export type CreatePost = Omit<Post, "user" | "id" | "userId">;

export const listCities = async (ctx: ctxType | null = null) => {
  const { data: cities } = await serverSideAPi(ctx).get<City[]>(`/cities`);
  return cities;
};

export const createPost = async (body: CreatePost) => {
  const { data: post } = await api.post<
    unknown,
    AxiosResponse<Post>,
    CreatePost
  >("/posts", body);
  return post;
};
