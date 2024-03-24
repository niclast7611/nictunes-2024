import { createSlice } from '@reduxjs/toolkit'

interface deviceIdState {
    deviceId: string | null
    }

const initialState: deviceIdState = {
  deviceId: null
}
export const deviceIdSlice = createSlice({
  name: 'deviceId',
  initialState,
  reducers: {
    setDeviceId: (state, action) => {
      state.deviceId = action.payload
    },
    removeDeviceId: state => {
      state.deviceId = null
    },
  }
})

export const { setDeviceId, removeDeviceId } = deviceIdSlice.actions

export default deviceIdSlice.reducer