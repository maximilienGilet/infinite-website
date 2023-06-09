import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const path = (params?.subroutes as string[]).join("/") ?? "Page";

  return { props: { path } };
};

export default function Page({
  path,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCompletion() {
      const fetched = await fetch("/api/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });
      const { content } = await fetched.json();
      setContent(content);
      setLoading(false);
    }
    try {
      fetchCompletion();
    } catch (e) {
      setContent("Error loading page");
      setLoading(false);
    }
  });

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div>
          <h1>Loading your page...</h1>
          <div className="flex justify-center">
            <div
              className="mt-4 h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blaxk motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
}
