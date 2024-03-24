import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IoIosRewind, IoIosFastforward } from "react-icons/io";
import { HiSwitchHorizontal, HiReply } from "react-icons/hi";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaVolumeUp,
  FaVolumeDown,
} from "react-icons/fa";
import { setSong } from "@/features/songSlice";
import { setIsPlaying } from "@/features/isPlayingSlice";
import { debounce } from "lodash";
import usePlayerSdk from "@/hooks/usePlayerSdk";

type Props = {};

const Player = (props: Props) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const songId = useAppSelector((state) => state.song.songId);
  const isPlaying = useAppSelector((state) => state.isPlaying.isPlaying);

  const dispatch = useAppDispatch();

  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const player = usePlayerSdk();
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((res) => {
        if (res && res.body?.item) {
          dispatch(setSong(res?.body?.item.id));
          spotifyApi.getMyCurrentPlaybackState().then((res) => {
            if (res && res.body?.is_playing) {
              dispatch(setIsPlaying(res?.body?.is_playing));
            }
          });
        }
      });
    }
  };

  useEffect(
    () => {
      if (spotifyApi.getAccessToken() && !songId) {
        fetchCurrentSong();
        setVolume(50);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [songId, spotifyApi, session]
  );

  useEffect(() => {
    const debouncedAdjustVolume = debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 500);

    if (volume > 0 && volume <= 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume, spotifyApi]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          src={songInfo?.album.images[0].url}
          alt={songInfo?.name}
          className="hidden md:inline h-10 w-10"
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>
            {songInfo?.artists.map((artist: any) => artist.name).join(", ")}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <HiSwitchHorizontal className="button" />
        <IoIosRewind
          className="button"
          onClick={() => {
            player.previousTrack();
          }}
        />

        {isPlaying ? (
          <FaPauseCircle
            className="button w-10 h-10"
            onClick={() => {
              player.togglePlay();
              dispatch(setIsPlaying(false));
            }}
          />
        ) : (
          <FaPlayCircle
            className="button w-10 h-10"
            onClick={() => {
              player.togglePlay();
              dispatch(setIsPlaying(true));
            }}
          />
        )}
        <IoIosFastforward
          className="button"
          onClick={() => {
            player.nextTrack();
          }}
        />
        <HiReply className="button" />
      </div>

      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <FaVolumeDown
          className="button"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
          className="w-14 md:w-28"
        />
        <FaVolumeUp
          className="button"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  );
};

export default Player;
