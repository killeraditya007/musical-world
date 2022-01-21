import { configureStore } from "@reduxjs/toolkit"
import songsReducer from "./slice"
export const store = configureStore({
    reducer: {
        songs: songsReducer,
    },
})