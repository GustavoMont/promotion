export interface User {
  name: string;
  lastName: string;
  email: string;
  avatar: string | null;
}

export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface TokenUser {
  id: number;
  role: RoleEnum;
}
