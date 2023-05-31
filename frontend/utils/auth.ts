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

export const getToken = (ctx: ctxType | null = null) => {
  const { [authCookieKey]: token } = parseCookies(ctx);
  return token;
};
