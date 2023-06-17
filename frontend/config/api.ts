import { ctxType } from "@/types/Ctx";
import { destroyToken, getToken } from "@/utils/auth";
import axios from "axios";
const baseURL = "http://localhost:5198/api";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      destroyToken();

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const serverSideAPi = (ctx: ctxType | null) => {
  const token = getToken(ctx);
  api.defaults.headers["Authorization"] = `Bearer ${token}`;

  return api;
};

export default api;
