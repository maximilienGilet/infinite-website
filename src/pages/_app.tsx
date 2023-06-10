import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { init } from "@socialgouv/matomo-next";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (MATOMO_SITE_ID && MATOMO_URL) {
      init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
    }
  }, []);
  return <>{loading ? <h1>Loading...</h1> : <Component {...pageProps} />}</>;
}
