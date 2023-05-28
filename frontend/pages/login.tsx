import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { TextInput } from "@/components/form/TextInput";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Title } from "@/components/Typograph/Title";
import { Button } from "@/components/common/Button";
import api from "@/config/api";

const Login = () => {
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration

  // // Initialize Firebase

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(result);
      const token = await auth.currentUser?.getIdToken();
      const { email, displayName, photoURL: avatar } = result.user;
      const [name, lastName] = displayName?.split(" ") ?? ["", ""];
      await api.post(
        "/users/external",
        {
          email,
          lastName,
          name,
          avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      /* empty */
    }
  };

  return (
    <div className="px-4 relative h-screen flex items-center justify-center">
      <BackgroundColor color="primary" position="top" />
      <BackgroundColor color="black" position="bottom" />

      <div className="bg-white max-w-lg p-6 flex flex-col items-center gap-4 rounded-lg">
        <Title level="h2" className="text-primary">
          PROMOTION
        </Title>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextInput
            icon={<UserIcon className="w-6 h-6" />}
            placeholder="Digite seu usuário"
          />
          <TextInput
            icon={<LockClosedIcon className="w-6 h-6" />}
            placeholder="Digite seu usuário"
          />
          <Button type="submit" rounded className="w-min self-end">
            Entrar
          </Button>
        </form>
        <Button onClick={googleSignIn} className="w-full" rounded>
          Entrar com Google
        </Button>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h1>login</h1>
  //     <button
  //       onClick={() => {
  //         signInWithPopup(auth, provider)
  //           .then((result) => {
  //             // This gives you a Google Access Token. You can use it to access the Google API.
  //             const credential =
  //               GoogleAuthProvider.credentialFromResult(result);
  //             const token = credential?.accessToken;
  //             auth.currentUser?.getIdToken().then((idToken) => {
  //               console.log(idToken);
  //             });

  //             // The signed-in user info.
  //             const user = result.user;
  //             console.log(user);

  //             // IdP data available using getAdditionalUserInfo(result)
  //             // ...
  //           })
  //           .catch((error) => {
  //             // Handle Errors here.
  //             const errorCode = error.code;
  //             const errorMessage = error.message;
  //             // The email of the user's account used.
  //             const email = error.customData.email;
  //             // The AuthCredential type that was used.
  //             const credential = GoogleAuthProvider.credentialFromError(error);
  //             // ...
  //           });
  //       }}
  //     >
  //       GOOOOGLEKKKKKKK
  //     </button>
  //   </div>
  // );
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

export default Login;
