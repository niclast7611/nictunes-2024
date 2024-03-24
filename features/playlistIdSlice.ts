import { createSlice } from '@reduxjs/toolkit'

interface playlistIdState {
    playlistId: string | null
    }

const initialState: playlistIdState = {
  playlistId: null
}
export const playlistIdSlice = createSlice({
  name: 'playlistId',
  initialState,
  reducers: {
    setPlaylistId: (state, action) => {
      state.playlistId = action.payload
    },
    removePlaylistId: state => {
      state.playlistId = null
    },
  }
})

export const { setPlaylistId, removePlaylistId } = playlistIdSlice.actions

export default playlistIdSlice.reducer