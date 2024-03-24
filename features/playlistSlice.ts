import { createSlice } from '@reduxjs/toolkit'

interface playlistState {
    playlist: any | null
    }

const initialState: playlistState = {
  playlist: null
}
export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylist: (state, action) => {
      state.playlist = action.payload
    },
    removePlaylist: state => {
      state.playlist = null
    },
  }
})

export const { setPlaylist, removePlaylist } = playlistSlice.actions

export default playlistSlice.reducer