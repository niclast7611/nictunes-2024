import { setPlaylist } from "@/features/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Songs from "./Songs";

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
  const spotifyApi = useSpotify();
  const [color, setColor] = useState("red-500");
  const playlistId = useAppSelector((state) => state.playlistId);
  const playlist = useAppSelector((state) => state.playlist)?.playlist;

  const dispatch = useAppDispatch();

  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  }, [playlistId]);

  useEffect(() => {
    if (playlistId.playlistId) {
      spotifyApi
        .getPlaylist(playlistId.playlistId)
        .then((data) => {
          dispatch(setPlaylist(data.body));
        })
        .catch((err) => console.log(err));
    }
  }, [playlistId, spotifyApi]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white">
          <img
            src={
              session?.user?.image ??
              "https://www.highsnobiety.com/static-assets/dato/1696613219-drake-for-all-the-dogs-lyrics.jpg"
            }
            alt="Profile"
            className="rounded-full w-10 h-10"
          />
          <h2>{session?.user?.name}</h2>
          <FaChevronDown className="h-4 w-4" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt={playlist?.name}
          className="h-44 w-44 shadow-2xl"
        />

        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
