import { SessionProvider } from "next-auth/react";
import Layout from "../app/layout";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../app/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
