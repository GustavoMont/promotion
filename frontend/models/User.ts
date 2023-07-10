export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  name: string;
  lastName: string;
  email: string;
  avatar: string | null;
  role: RoleEnum;
}

export interface TokenUser {
  id: number;
  role: RoleEnum;
}
