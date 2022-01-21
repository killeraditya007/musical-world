import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    songs:[],
    searchData:'',
    isLoggedIn:false,
    users:[],
    currUser:[],    
    selectedSong:[],
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

//method to get data
export const getAllSongs = (state) => state.songs.songs
export const getSearchData = (state) => state.songs.searchData
export const getLoginState = (state) => state.songs.isLoggedIn
export const getAllUsers = (state) => state.songs.users
export const getCurrUser = (state) => state.songs.currUser
export const getSelectedSong = (state) => state.songs.selectedSong

export default songSlice.reducer