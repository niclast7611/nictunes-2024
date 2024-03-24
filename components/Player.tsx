import { useAppSelector } from "@/hooks/hooks";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type Props = {};

const Player = (props: Props) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const songId = useAppSelector((state) => state.song.songId);
  const isPlaying = useAppSelector((state) => state.isPlaying.isPlaying);

  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();
  console.log("songId", songId);

  console.log("songInfo", songInfo);
  return (
    <div>
      <div>
        <img
          src={songInfo?.album.images[0].url}
          alt={songInfo?.name}
          className="hidden md:inline h-10 w-10"
        />
      </div>
    </div>
  );
};

export default Player;
