import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Disk from "../../Assets/Img/cd.png";
import { getAllSongs, getSearchData, getLoginState, setSelectedSong } from "../../Redux/slice"
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const SongList = ({action, filterValue}) => {
    const songs = useSelector(getAllSongs)
    const searchTerm = useSelector(getSearchData)
    const isLoggedIn = useSelector(getLoginState)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleEdit = (id) =>{
        if(isLoggedIn){
            dispatch(setSelectedSong(songs.filter(song => {
                if(song.id === id){
                    return song
                }})))
            history.push(`/edit/${id}`)
        }
        else{
            toast.warning("Login First!")
        }
    }
    const handleDelete = async(id) =>{
        if(isLoggedIn){
            history.push(`/delete/${id}`)
        }
        else{
            toast.warning("Login First!")
        }
    }

    const showDetails = (id) =>{
        dispatch(setSelectedSong(songs.filter(song => {
            if(song.id === id){
                return song
            }})))
    }

    // const showDetails = (id, title) =>{
    //     if(isLoggedIn){
    //         dispatch(setSelectedSong(songs.filter(song => {
    //             if(song.id === id){
    //                 return song
    //             }})))
    //         history.push(`/songs/${id}/${title}`)
    //     }
    //     else{
    //         toast.warning("Login First!")
    //     }
    // }

    const renderList = songs.filter((song)=>{
        if(action ==="none"){
            if(searchTerm === ""){
                return song
            }
            else if(song.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || song.artist.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || song.movie.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
                return song
            }
        }
        else if(action ==="genre"){
            if(song.genre.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())){
                if(searchTerm === ""){
                    return song
                }
                else if(song.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || song.artist.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || song.movie.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
                    return song
                }
            }
        }
        else if(action ==="language"){
            if(song.language.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())){
                if(searchTerm === ""){
                    return song
                }
                else if(song.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || song.artist.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || song.movie.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
                    return song
                }
            }
        }
    }).map(song =>{
        const {id, title, movie, artist} = song
        return (
            <div className='col-sm-6 col-md-4 col-lg-3 ' key={id}>
                <div className="card position-relative">
                    <span className="position-absolute top-0 end-0" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><FiMoreVertical/></span>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><label className="dropdown-item" onClick={() => handleEdit(id)}><AiFillEdit/> Edit</label></li>
                        <li><label className="dropdown-item" onClick={() => handleDelete(id)}><AiFillDelete/> Delete</label></li>
                    </ul>
                    <div onClick={() => showDetails(id, title)}>
                        <img src={Disk} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{movie}<br/>{artist}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return(
        <>{renderList}</>
    )
}

export default SongList