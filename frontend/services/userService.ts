import api from "@/config/api";
import { AccessToken } from "@/models/Auth";
import { User } from "@/models/User";

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

export const getCurrentUser = async () => {
  const { data: user } = await api.get<User>("/users/me");
  return user;
};
