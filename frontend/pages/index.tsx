import { Title } from "@/components/Typograph/Title";
import { PostCard } from "@/components/posts/PostCard";
import { ListPostFilters, listCities, listPosts } from "@/services/postService";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [postQuery, setPostQuery] = useState<ListPostFilters>({});
  const { data: cities } = useQuery(["cities"], () => listCities());
  const { data: posts, isLoading } = useQuery(["posts", postQuery], () =>
    listPosts(postQuery)
  );
  const { register, watch } = useForm<{
    city: string;
    lessComplaints?: boolean;
  }>({
    defaultValues: {
      city: "0",
    },
  });
  const selectedCity = watch("city");
  const lessComplaints = watch("lessComplaints");

  useEffect(() => {
    if (selectedCity && selectedCity !== "0") {
      setPostQuery((query) => ({
        ...query,
        city: selectedCity,
      }));
    } else {
      setPostQuery((query) => ({
        ...query,
        city: undefined,
      }));
    }
    return () => {
      setPostQuery({});
    };
  }, [selectedCity]);

  useEffect(() => {
    if (lessComplaints) {
      setPostQuery((query) => ({
        ...query,
        orderBy: "less_complaints",
      }));
    } else {
      setPostQuery((query) => ({
        ...query,
        orderBy: undefined,
      }));
    }
  }, [lessComplaints]);

  return (
    <>
      <Head>
        <title>Promotion - Escolha a melhor oferta!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pt-10">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <p className="font-medium text-dark-primary">Cidades:</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  value={"0"}
                  {...register("city")}
                  className="radio radio-primary"
                />
                <span>Todas</span>
              </div>
              {cities?.map((city) => (
                <div className="flex items-center gap-1" key={city.id}>
                  <input
                    type="radio"
                    {...register("city")}
                    value={city.id.toString()}
                    className="radio radio-primary"
                  />
                  <span>{city.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              className="checkbox"
              {...register("lessComplaints")}
            />
            <span className="font-medium">Melhor avaliadas</span>
          </div>
        </div>
        <Title level="h2" className="mb-10 text-center text-accent">
          Confira todas as ofertas!
        </Title>
        <section className="flex gap-5 justify-center">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-2 2xl:grid-cols-4">
            {isLoading ? "CARREGANDO" : null}
            {posts?.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["posts", {}], () => listPosts({}, ctx));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
