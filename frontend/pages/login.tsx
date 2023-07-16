/* eslint-disable @next/next/no-img-element */
import React, { ReactElement } from "react";
import { TextInput } from "@/components/form/TextInput";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Title } from "@/components/Typograph/Title";
import { Button } from "@/components/common/Button";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { Login } from "@/services/userService";
import { NextPageWithLayout } from "./_app";
import googleIcon from "@/public/google.png";

const Login: NextPageWithLayout = () => {
  const { googleSignIn, login } = useAuth();
  const { register, handleSubmit } = useForm<Login>();

  return (
    <div className="px-4 relative h-screen flex items-center justify-center">
      <BackgroundColor color="primary" position="top" />
      <BackgroundColor color="black" position="bottom" />

      <div className="bg-gray-100 max-w-lg p-6 flex flex-col items-center gap-4 rounded-lg">
        <Title level="h2" className="text-primary">
          PROMOTION
        </Title>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(login)}>
          <TextInput
            register={register("email")}
            icon={<UserIcon className="w-6 h-6" />}
            placeholder="Digite seu usuário"
          />
          <TextInput
            register={register("password")}
            isPassword
            icon={<LockClosedIcon className="w-6 h-6" />}
            placeholder="Digite seu usuário"
          />
          <Button type="submit" rounded className="w-min self-end">
            Entrar
          </Button>
        </form>
        <Button
          color="none"
          onClick={googleSignIn}
          className="w-full border-2 border-gray-900"
          rounded
        >
          <div className="flex gap-5 items-center">
            <div className="avatar">
              <div className="w-5">
                <img src={googleIcon.src} alt="google icon" />
              </div>
            </div>
            <p>Entrar com Google</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

interface BackgroundColorProps {
  color: "primary" | "black";
  position: "top" | "bottom";
}

const BackgroundColor: React.FC<BackgroundColorProps> = ({
  color,
  position,
}) => (
  <div
    className={`w-full h-1/2 absolute -z-10 ${
      color === "primary" ? "bg-primary" : "bg-black"
    } ${position === "top" ? "top-0" : "bottom-0"}`}
  />
);

Login.getLayout = (page: ReactElement) => {
  return <>{page}</>;
};

export default Login;
