import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";

import { Poppins } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { ReactElement, ReactNode, useState } from "react";
import { NextPage } from "next";
import { Layout } from "@/components/common/layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

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

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <main className={poppins.className}>
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer />
          </main>
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
