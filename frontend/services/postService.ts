import api, { serverSideAPi } from "@/config/api";
import { City } from "@/models/Address";
import { Post } from "@/models/Post";
import { ctxType } from "@/types/Ctx";
import { AxiosResponse } from "axios";

type CreatePost = Omit<Post, "user" | "id" | "userId" | "image"> & {
  image: File | null;
};

export type CreatePostForm = Omit<CreatePost, "image"> & {
  image: FileList;
};

export const listCities = async (ctx: ctxType | null = null) => {
  const { data: cities } = await serverSideAPi(ctx).get<City[]>(`/cities`);
  return cities;
};

export const updatePost = async (
  postId: number,
  { image: fileList, ...body }: CreatePostForm
) => {
  console.log(body);

  const image = fileList?.item(0);
  const { data } = await api.put<unknown, AxiosResponse<Post>, CreatePost>(
    `/posts/${postId}`,
    {
      ...body,
      image,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const createPost = async ({ image: file, ...body }: CreatePostForm) => {
  const image = file.item(0);

  const { data: post } = await api.post<
    unknown,
    AxiosResponse<Post>,
    CreatePost
  >(
    "/posts",
    {
      ...body,
      image,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return post;
};

export const listPostsByUser = async (userId: number, ctx?: ctxType) => {
  const requester = ctx ? serverSideAPi(ctx) : api;
  const { data } = await requester.get<Post[]>(`/posts/?userId=${userId}`);
  return data;
};

export const listMostComplaintsPosts = async (ctx: ctxType | null = null) => {
  const requester = ctx ? serverSideAPi(ctx) : api;
  const { data } = await requester.get<Post[]>("posts/complaints");
  return data;
};

export const deletePost = async (postId: number) => {
  await api.delete(`posts/${postId}`);
};

export const getPost = async (postId: number, ctx?: ctxType) => {
  const requester = ctx ? serverSideAPi(ctx) : api;
  const { data: post } = await requester.get<Post>(`/posts/${postId}`);
  return post;
};

const toQueryParams = <T extends object>(obj: T): string => {
  const filterEntries = Object.entries(obj);
  const query = filterEntries.reduce((prev, [key, value], i) => {
    if (typeof value === "undefined") {
      return "";
    }
    const query = `${key}=${value}`;
    return i === 0 || prev[0] !== "?" ? `?${query}` : `${prev}&${query}`;
  }, "");
  return query;
};

export interface ListPostFilters {
  city?: string;
  orderBy?: "less_complaints" | "recents";
}

export const listPosts = async (filters?: ListPostFilters, ctx?: ctxType) => {
  const requester = ctx ? serverSideAPi(ctx) : api;
  const { data: posts } = await requester.get<Post[]>(
    `/posts${filters ? toQueryParams<ListPostFilters>(filters) : ""}`
  );
  return posts;
};
