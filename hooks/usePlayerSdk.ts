import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";
import { useAppDispatch } from "./hooks";
import { removeDeviceId, setDeviceId } from "@/features/deviceIdSlice";

function usePlayerSdk() {

    const spotifyApi = useSpotify();
    const dispatch = useAppDispatch();
    const [player, setPlayer] = useState<any>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => {
          // @ts-ignore
          const player = new window.Spotify.Player({
            name: "Web Playback SDK",
    
            getOAuthToken: (cb: any) => {
              cb(spotifyApi.getAccessToken());
            },
            volume: 0.5,
          });
    
          setPlayer(player)
    
          player.addListener("ready", ({ device_id }: { device_id: number }) => {
            dispatch(setDeviceId(device_id));
            console.log("Ready with Device ID", device_id);
          });
          player.addListener(
            "not_ready",
            ({ device_id }: { device_id: number }) => {
              dispatch(removeDeviceId());
              console.log("Device ID has gone offline", device_id);
            }
          );
    
          player.connect();
        };
      }, []);

    return player;
    }

export default usePlayerSdk;