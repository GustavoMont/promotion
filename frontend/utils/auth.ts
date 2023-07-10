import { UserToken } from "@/models/Auth";
import jwtDecode from "jwt-decode";
import { NextApiRequest, NextPageContext } from "next";
import { destroyCookie, parseCookies } from "nookies";

export const authCookieKey = "@promotion_access";

type ctxType =
  | Pick<NextPageContext, "req">
  | {
      req: NextApiRequest;
    }
  | {
      req: Request;
    };
export const destroyToken = () => {
  destroyCookie(null, authCookieKey);
};

export const getTokenUser = (ctx: ctxType | null = null): UserToken | null => {
  const token = getToken(ctx);
  if (token) {
    return jwtDecode<UserToken>(token);
  }
  return null;
};

export const getToken = (ctx: ctxType | null = null) => {
  const { [authCookieKey]: token } = parseCookies(ctx);
  return token;
};
