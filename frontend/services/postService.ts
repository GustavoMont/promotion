import api, { serverSideAPi } from "@/config/api";
import { City } from "@/models/Address";
import { Post } from "@/models/Post";
import { ctxType } from "@/types/Ctx";
import { AxiosResponse } from "axios";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { uid } from "uid";

export const storage = getStorage();

type CreatePost = Omit<Post, "user" | "id" | "userId">;

export type CreatePostForm = Omit<CreatePost, "image"> & {
  image: FileList;
};

export const listCities = async (ctx: ctxType | null = null) => {
  const { data: cities } = await serverSideAPi(ctx).get<City[]>(`/cities`);
  return cities;
};

export const createPost = async ({ image: file, ...body }: CreatePostForm) => {
  const image = file.item(0);
  let imageUrl;
  if (image) {
    const storageRef = ref(storage, `images/posts/${uid()}-${image.name}`);
    await uploadBytes(storageRef, image);
    imageUrl = await getDownloadURL(storageRef);
  }
  const { data: post } = await api.post<
    unknown,
    AxiosResponse<Post>,
    CreatePost
  >("/posts", {
    ...body,
    image: imageUrl ?? undefined,
  });
  return post;
};
