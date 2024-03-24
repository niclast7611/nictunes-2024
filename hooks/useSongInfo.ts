import { useEffect, useState } from 'react';
import { useAppSelector } from './hooks';
import useSpotify from './useSpotify';

function useSongInfo() {
    const spotifyApi = useSpotify();
    const songId = useAppSelector((state) => state.song.songId);

    const [songInfo, setSongInfo] = useState<any>(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if(songId) {
                try {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${songId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        },
                    }
                ).then((res) => res.json())

            setSongInfo(trackInfo)
                } catch (error) {
                    console.error(error)
                }

            }
        }

        fetchSongInfo()
    }, [songId, spotifyApi])

    return songInfo
}

export default useSongInfo