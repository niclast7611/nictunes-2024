import Center from "@/components/Center";
import Sidebar from "@/components/Sidebar";
import { getSession } from "next-auth/react";
import React from "react";

const Home = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div>{/* player */}</div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
