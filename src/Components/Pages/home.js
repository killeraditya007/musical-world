import React, {useEffect, useState, Suspense, lazy} from 'react'
import { db } from '../../firebase'
import {collection, getDocs} from "firebase/firestore"
import { useDispatch } from "react-redux";
import { setSongs } from "../../Redux/slice"
import { ActionButton } from '../FloatingActionButton/floatingButton';
import { Menu } from '../FilterMenu/menu';
import { RiLoaderFill } from "react-icons/ri"
const SongList = lazy(() => import('../SongListing/songList'))

export const Home = () => {
    const [action, setAction] = useState("none")
    const [filterTerm, setFilterTerm] = useState("")
    const [selectedLanguage, setselectedLanguage] = useState("None")
    const [selectedGenre, setselectedGenre] = useState("None")
    const dispatch = useDispatch()
    const userCollectionRef = collection(db, "songs")

    const handleGenre = (e) =>{
        if(selectedLanguage !== "none"){
            setselectedLanguage("none")
        }
        if(e.target.value === "none"){
            setAction("none")
            setFilterTerm("")
            setselectedGenre("none")
        }
        else{
            setselectedGenre(e.target.value)
            setAction("genre")
            setFilterTerm(e.target.value)
        }
    }
    const handleLanguage = (e) =>{
        if(selectedGenre !== "none"){
            setselectedGenre("none")
        }
        if(e.target.value === "none"){
            setAction("none")
            setFilterTerm("")
            setselectedLanguage("none")
        }
        else{
            setselectedLanguage(e.target.value)
            setAction("language")
            setFilterTerm(e.target.value)
        }
    }

    useEffect(() => {
        const getSongs = async() =>{
            const data = await getDocs(userCollectionRef)
            dispatch(setSongs(data.docs.map((doc)=>({...doc.data(), id: doc.id}))))
        }
        getSongs()
    }, [])
    return (
        <div className="container">
            <div className='row gy-2 mt-2'>
                <div className='col-sm-12 col-md-6 col-lg-6'>
                    <label className='ps-2'>
                        <strong className='pe-4'>Filter</strong>Genre :{" "}
                        <select 
                            value={selectedGenre} 
                            onChange={handleGenre}
                        >
                            <option value="none">----------------</option>
                            <Menu action="genre"/>
                        </select>
                    </label>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-6'>
                    <label className='ps-4'>
                        Language :{" "}
                        <select 
                            value={selectedLanguage} 
                            onChange={handleLanguage}
                        >
                            <option value="none">----------------</option>
                            <Menu action="language" />
                        </select>
                    </label>
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
                    <SongList action={action} filterValue={filterTerm}/>
                </Suspense>
            </div>
            <ActionButton/>
        </div>
    )
}
