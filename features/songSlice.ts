import { createSlice } from '@reduxjs/toolkit'

interface songState {
    songId: number | null
    }

const initialState: songState = {
  songId: null
}
export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.songId = action.payload
    },
    removeSong: state => {
      state.songId = null
    },
  }
})

export const { setSong, removeSong } = songSlice.actions

export default songSlice.reducer