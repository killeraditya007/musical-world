import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    songs:[],
    searchData:'',
    isLoggedIn:false,
    users:[],
    currUser:[],    
    selectedSong:[],
    isSongDetailsVisible:false
}

const songSlice = createSlice({
    name:"songs",
    initialState,
    reducers:{
        setSongs:(state, {payload}) => {
            state.songs = payload
        },
        setSearch:(state, {payload}) => {
            state.searchData = payload
        },
        setLogin:(state, {payload}) => {
            state.isLoggedIn = payload
        },
        setUsers:(state, {payload}) => {
            state.users = payload
        },
        setCurrUser:(state, {payload}) => {
            state.currUser = payload
        },
        setSelectedSong:(state, {payload}) => {
            state.selectedSong = payload
        },
        setSongDetailState:(state, {payload}) => {
            state.isSongDetailsVisible = payload
        }
    },
})
//method to dispact data
export const { setSongs } = songSlice.actions
export const { setSearch } = songSlice.actions
export const { setLogin } = songSlice.actions
export const { setUsers } = songSlice.actions
export const { setCurrUser } = songSlice.actions
export const { setSelectedSong } = songSlice.actions
export const { setSongDetailState } = songSlice.actions

//method to get data
export const getAllSongs = (state) => state.songs.songs
export const getSearchData = (state) => state.songs.searchData
export const getLoginState = (state) => state.songs.isLoggedIn
export const getAllUsers = (state) => state.songs.users
export const getCurrUser = (state) => state.songs.currUser
export const getSelectedSong = (state) => state.songs.selectedSong
export const getSongDetailState = (state) => state.songs.isSongDetailsVisible

export default songSlice.reducer