import api from "@/config/api";
import { AccessToken } from "@/models/Auth";
import { User } from "@/models/User";
import {
  Login,
  getCurrentUser,
  login as userLogin,
} from "@/services/userService";
import { authCookieKey, destroyToken, getToken } from "@/utils/auth";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

interface AuthContextProps {
  login(data: Login): Promise<void>;
  logout(): void;
  googleSignIn(): Promise<void>;
  setUser(user: User): void;
  user: User | null;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const login = async (data: Login) => {
    try {
      destroyToken();
      const { access } = await userLogin(data);
      router.push("/");
      setUserByToken(access);
    } catch (error) {
      toast.error("Usuário ou senha incorretos");
    }
  };
  const logout = async () => {
    setUser(null);
    destroyToken();
    onSignIn();
  };
  const [user, setUser] = useState<User | null>(null);
  const updateUser = (user: User) => setUser(user);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const storeAccess = (token: string) => {
    setCookie(null, authCookieKey, token, {
      maxAge: 60 * 60 * 8,
    });
  };

  const setUserByToken = useCallback(async (token: string) => {
    try {
      storeAccess(token);
      setUser(await getCurrentUser());
    } catch (error) {
      /** */
    }
  }, []);

  type SocialSignInUser = {
    avatar: string;
    email: string;
    lastName: string;
    name: string;
  };

  const socialSignIn = async (
    { avatar, email, lastName, name }: SocialSignInUser,
    token: string
  ) => {
    const { data: accessToken } = await api.post<AccessToken>(
      "/users/external",
      {
        avatar,
        email,
        lastName,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await setUserByToken(accessToken.access);
  };

  const onSignIn = () => {
    router.push("/");
  };

  const googleSignIn = async () => {
    try {
      destroyToken();
      const result = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(result);
      const token = await auth.currentUser?.getIdToken();
      const { email, displayName, photoURL: avatar } = result.user;
      const [name, lastName] = displayName?.split(" ") ?? ["", ""];
      if (email && avatar && token) {
        socialSignIn({ email, avatar, name, lastName }, token);
        onSignIn();
      }
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUserByToken(token);
    }
  }, [setUserByToken]);

  return (
    <AuthContext.Provider
      value={{ logout, googleSignIn, user, login, setUser: updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
