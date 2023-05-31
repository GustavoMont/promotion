import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";

import { Poppins } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin-ext"],
});

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: `${process.env.NEXT_PUBLIC_APP_ID}.firebaseapp.com`,
  projectId: `${process.env.NEXT_PUBLIC_APP_ID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_APP_ID}.appspot.com`,
  messagingSenderId: "178437899545",
  appId: "1:178437899545:web:6c9708d466234839d7f188",
};

initializeApp(firebaseConfig);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </main>
  );
}
