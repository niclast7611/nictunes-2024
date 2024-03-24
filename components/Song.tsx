import { setIsPlaying } from "@/features/isPlayingSlice";
import { setSong } from "@/features/songSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useMillisToMinutesAndSeconds } from "@/hooks/useMillisToMinutesAndSeconds";
import useSpotify from "@/hooks/useSpotify";
import React from "react";

type Props = {
  track: any;
  order: number;
};

const Song = ({ track, order }: Props) => {
  const spotifyApi = useSpotify();

  const dispatch = useAppDispatch();
  const deviceId = useAppSelector((state) => state.deviceId.deviceId);
  const songId = useAppSelector((state) => state.song.songId);

  const playSong = () => {
    try {
      if (!deviceId) return;
      dispatch(setSong(track.track.id));
      dispatch(setIsPlaying(true));
      spotifyApi.play({
        uris: [track.track.uri],
        device_id: deviceId,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p className={track?.track.id === songId ? "text-[#1fde64]" : ""}>
          {order++}
        </p>
        <img
          src={track?.track.album.images[0].url}
          alt={track?.track.album.name}
          className="h-10 w-10"
        />
        <div>
          <p
            className={
              track?.track.id === songId
                ? "w-36 lg:w-64 text-[#1fde64] truncate"
                : "w-36 lg:w-64 text-white truncate"
            }
          >
            {track.track.name}
          </p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-48 hidden md:inline">{track.track.album.name}</p>
        <p>{useMillisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
