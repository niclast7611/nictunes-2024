import React from "react";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { HiOutlineLibrary } from "react-icons/hi";
import { FaRss } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { IoSearch, IoLogOutOutline } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";

type Props = {};

const Sidebar = (props: Props) => {
  const { data: session, status } = useSession();

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <IoLogOutOutline className="h-5 w-5" />
          <p>Logout</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <AiOutlineHome className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <IoSearch className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HiOutlineLibrary className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-500" />
        <button className="flex items-center space-x-2 hover:text-white">
          <AiOutlinePlusCircle className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <FaRegHeart className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <FaRss className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-500" />

        {/* Playlists */}
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
      </div>
    </div>
  );
};

export default Sidebar;
