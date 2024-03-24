import { createSlice } from '@reduxjs/toolkit'

interface isPlayingState {
    isPlaying: boolean
    }

const initialState: isPlayingState = {
  isPlaying: false
}
export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload
    },
  }
})

export const { setIsPlaying } = songSlice.actions

export default songSlice.reducer