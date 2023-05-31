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

interface AuthContextProps {
  login(data: Login): Promise<void>;
  logout(): void;
  googleSignIn(): Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const login = async (data: Login) => {
    const { access } = await userLogin(data);
    setUserByToken(access);
  };
  const logout = async () => destroyToken();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const storeAccess = (token: string) => {
    setCookie(null, authCookieKey, token, {
      maxAge: 60 * 60 * 8,
    });
  };

  const setUserByToken = useCallback(async (token: string) => {
    storeAccess(token);
    setUser(await getCurrentUser());
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

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    } else if (!user) {
      setUserByToken(token);
    }
  }, [router, setUserByToken, user]);

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(result);
      const token = await auth.currentUser?.getIdToken();
      const { email, displayName, photoURL: avatar } = result.user;
      const [name, lastName] = displayName?.split(" ") ?? ["", ""];
      if (email && avatar && token) {
        socialSignIn({ email, avatar, name, lastName }, token);
      }
    } catch (error) {
      /* empty */
    }
  };

  return (
    <AuthContext.Provider value={{ logout, googleSignIn, user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
