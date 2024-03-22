import { getProviders } from "next-auth/react";
import React from "react";

type Props = {
  providers: any;
};

const Login = ({ providers }: Props) => {
  console.log(providers);
  return <div>Login</div>;
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
