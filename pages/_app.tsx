import { SessionProvider } from "next-auth/react";
import Layout from "../app/layout";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistor, store } from "../app/store";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
