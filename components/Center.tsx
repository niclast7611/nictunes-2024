import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type Props = {};

const colors = [
  "from-red-500",
  "from-blue-500",
  "from-green-500",
  "from-yellow-500",
  "from-indigo-500",
  "from-purple-500",
  "from-pink-500",
];

const Center = (props: Props) => {
  const { data: session } = useSession();
  const [color, setColor] = useState("red-500");

  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            src={
              session?.user?.image ??
              "https://www.highsnobiety.com/static-assets/dato/1696613219-drake-for-all-the-dogs-lyrics.jpg"
            }
            alt="Profile"
            className="rounded-full w-10 h-10"
          />
          <h2>{session?.user?.name}</h2>
          <FaChevronDown className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <h1>Hello</h1>
      </section>
    </div>
  );
};

export default Center;
