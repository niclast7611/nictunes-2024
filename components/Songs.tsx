import { useAppSelector } from "@/hooks/hooks";
import React from "react";
import Song from "./Song";

type Props = {};

const Songs = (props: Props) => {
  const playlist = useAppSelector((state) => state.playlist)?.playlist;

  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlist?.tracks.items.map((track: any, i: number) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
};

export default Songs;
