import React from 'react'
import { useSelector } from "react-redux";
import { getAllSongs } from '../../Redux/slice';

export const Menu = ({action}) => {
    const songs = useSelector(getAllSongs)
    let menus = []
    if(action === "genre"){
        menus = [...new Set(songs.map(song => song.genre))]
    }
    else{
        menus = [...new Set(songs.map(song => song.language))]
    }
    const renderList = menus.map((menu,id) => {
        return (
            <option key={id} value={menu}>{menu}</option>
        ) 
    })

    return (
        <>{renderList}</>
    )
}

