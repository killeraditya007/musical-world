import React, {useEffect, useState, Suspense, lazy, useRef} from 'react'
import { db } from '../../firebase'
import {collection, getDocs} from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux";
import { setSongs, getSelectedSong, getLoginState, getSongDetailState, setSongDetailState } from "../../Redux/slice"
import { ActionButton } from '../FloatingActionButton/floatingButton';
import { Menu } from '../FilterMenu/menu';
import { RiLoaderFill } from "react-icons/ri"
import Disk from "../../Assets/Img/cd.png"
import { toast } from 'react-toastify';
import { SongDetails } from "../Pages/songDetails"

const SongList = lazy(() => import('../SongListing/songList'))

export const Home = () => {
    const isLoggedIn = useSelector(getLoginState)
    const isSongDetailsVisible = useSelector(getSongDetailState)
    const [filterStatus, setFilterStatus] = useState(true);
    const [duration, setDuration] = useState(0);
    const [action, setAction] = useState("none")
    const [firstFilterTerm, setFirstFilterTerm] = useState("")
    const [secondFilterTerm, setSecondFilterTerm] = useState("")
    const [selectedLanguage, setselectedLanguage] = useState("none")
    const [selectedGenre, setselectedGenre] = useState("none")
    const song = useSelector(getSelectedSong)
    const dispatch = useDispatch()
    const userCollectionRef = collection(db, "songs")
    const genreFilter = useRef()
    const languageFilter = useRef()
    const audioPlayer = useRef()

    const handleGenre = (e) =>{
        // console.log(genreFilter.current.value)
        if(e.target.value === "none"){
            if(selectedLanguage !== "none"){
                setAction("language")
                setFirstFilterTerm(languageFilter.current.value)
                setselectedGenre(e.target.value)
                // setselectedLanguage("none")
            }
            else{
                setFilterStatus(true)
                setAction("none")
                setFirstFilterTerm("")
                setselectedGenre(e.target.value)
            }
        }
        else{
            if(selectedLanguage !== "none"){
                setAction("hybrid")
                setSecondFilterTerm(e.target.value)
                setselectedGenre(e.target.value)
            }
            else{
                setFilterStatus(false)
                setselectedGenre(e.target.value)
                setAction("genre")
                setFirstFilterTerm(e.target.value)
            }
        }
    }
    const showDetails = () =>{
        if(isLoggedIn){
            const seconds = Math.floor(audioPlayer.current.duration)
            setDuration(seconds)
            dispatch(setSongDetailState(true))
        }
        else{
            toast.warning("Login First!")
        }
    }

    const calculateTime = (secs) =>{
        const minutes = Math.floor(secs / 60)
        const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(secs % 60)
        const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${returnMinutes} : ${returnSeconds}`
    }

    const handleLanguage = (e) =>{
        if(e.target.value === "none"){
            if(selectedGenre !== "none"){
                setAction("genre")
                setFirstFilterTerm(genreFilter.current.value)
                console.log()
                setselectedLanguage(e.target.value)
                // setselectedLanguage("none")
            }
            else{
                setFilterStatus(true)
                setAction("none")
                setFirstFilterTerm("")
                setselectedLanguage(e.target.value)
            }
        }
        else{
            if(selectedGenre !== "none"){
                setAction("hybrid")
                setSecondFilterTerm(e.target.value)
                setselectedLanguage(e.target.value)
            }
            else{
                setFilterStatus(false)
                setselectedLanguage(e.target.value)
                setAction("language")
                setFirstFilterTerm(e.target.value)
            }
        }
    }
    const clearFilter = () =>{
        setAction("none")
        setFirstFilterTerm("")
        setSecondFilterTerm("")
        setselectedLanguage("none")
        setselectedGenre("none")
        setFilterStatus(true)
    }

    useEffect(() => {
        const getSongs = async() =>{
            const data = await getDocs(userCollectionRef)
            dispatch(setSongs(data.docs.map((doc)=>({...doc.data(), id: doc.id}))))
        }
        getSongs()
    }, [])
    return (
        <>  
            {isSongDetailsVisible && song.length !==0 ? <SongDetails duration={calculateTime(duration)}/> : 
                <div className="container">
                    <div className='row gy-2 mt-2'>
                        <div className='col-sm-12 col-md-4 col-lg-4'>
                            <label className='ps-2'>
                                <strong className='pe-4'>Filter</strong>Genre :{" "}
                                <select 
                                    ref={genreFilter}
                                    value={selectedGenre} 
                                    onChange={handleGenre}
                                >
                                    <option value="none">----------------</option>
                                    <Menu action="genre"/>
                                </select>
                            </label>
                        </div>
                        <div className='col-sm-12 col-md-4 col-lg-4'>
                            <label className='ps-4'>
                                Language :{" "}
                                <select 
                                    ref={languageFilter}
                                    value={selectedLanguage} 
                                    onChange={handleLanguage}
                                >
                                    <option value="none">----------------</option>
                                    <Menu action="language" />
                                </select>
                            </label>
                        </div>
                        <div className='col-sm-12 col-md-4 col-lg-4'>
                            <button disabled={ filterStatus } onClick={clearFilter}>Clear Filter</button>
                        </div>
                    </div>
                    <hr/>
                    <div className='row gy-4 my-3'>
                        <Suspense fallback={
                            <div className="row"> 
                                <div className="error-template align-items-center text-center">
                                    <RiLoaderFill size='2em'/>
                                    <h2>Loading.....</h2>
                                </div>
                            </div>
                        }>
                            <SongList action={action} firstFilterValue={firstFilterTerm} secondFilterValue={secondFilterTerm}/>
                        </Suspense>
                    </div>
                    <ActionButton/>
                </div>
            }
            { song.length === 0 ? null : 
                <div className='f-b bg-dark'>
                    <img className='song-img' onClick={showDetails} src={Disk} alt="img"/>
                    <audio ref={audioPlayer} src={song.length === 0 ? '' : `${song[0].url}${song[0].title}.mp3`} controls autoPlay />
                </div>
            }
        </>
    )
}
