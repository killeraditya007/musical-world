import React, { useState } from 'react'
import { Prompt, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getLoginState, getSelectedSong } from '../../Redux/slice'
import { Error } from './error'
import { db } from '../../firebase'
import { updateDoc, doc} from "firebase/firestore"
import { toast } from 'react-toastify'

export const EditSong = () => {
    const [isNav,setNav] = useState(false)
    const history = useHistory()
    const isLoggedIn = useSelector(getLoginState)
    const [song, setSong] = useState(useSelector(getSelectedSong))
    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const handleSubmit= async(e) =>{
        e.preventDefault()
        const  selectDoc = doc(db, "songs", song[0].id)
        await updateDoc(selectDoc, song)
        setNav(false)
        history.push("/")
        setTimeout(() => toast.success("Song Updated!"), 100) 
    }
    
    return (
        <> {
            !isLoggedIn? <Error/>:
                <>
                    <Prompt when={isNav} message={()=>"Are you sure want to exit without updating song?"}></Prompt>
                    <div className='container p-3'>
                        <h1 className='display-3 text-center'>Edit Song!</h1>
                        <div className='row'>
                            <div className='col-md-6 shadow mx-auto p-5'>
                                <form onSubmit={handleSubmit}>
                                    <div className='form-group'>
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type='text' id='title' placeholder={song[0].title} className='form-control' onChange={(e) => {setSong(prevState => ({...prevState,title:e.target.value})); setNav(true)}}/>
                                    </div>
                                    <br/>
                                    <div className='form-group'>
                                        <label htmlFor="movie" className="form-label">Movie/Album</label>
                                        <input type='text' id='movie' placeholder={song[0].movie} className='form-control' onChange={(e) => {setSong(prevState => ({...prevState,movie:e.target.value})); setNav(true)}}/>
                                    </div>
                                    <br/>
                                    <div className='form-group'>
                                        <label htmlFor="singer" className="form-label">Singer</label>
                                        <input type='text' id='singer' placeholder={song[0].artist} className='form-control' onChange={(e) => {setSong(prevState => ({...prevState,artist:e.target.value})); setNav(true)}}/>
                                    </div>
                                    <br/>
                                    <div className='form-group'>
                                        <label htmlFor="len" className="form-label">Length</label>
                                        <input type='text' id='len' placeholder={song[0].len} className='form-control' onChange={(e) => {setSong(prevState => ({...prevState,len:e.target.value})); setNav(true)}}/>
                                    </div>
                                    <br/>
                                    <div className='form-group'>
                                        <label htmlFor="genre" className="form-label">Genre</label>
                                        <input type='text' id='genre' placeholder={song[0].genre} className='form-control' onChange={(e) => {setSong(prevState => ({...prevState,genre:Capitalize(e.target.value)})); setNav(true)}}/>
                                    </div>
                                    <br/>
                                    <div className='form-group'>
                                        <label htmlFor="lan" className="form-label">Language</label>
                                        <input type='text' id='lan' placeholder={song[0].language} className='form-control' onChange={(e) => {setSong(prevState => ({...prevState,language:Capitalize(e.target.value)})); setNav(true)}}/>
                                    </div>
                                    <br/>
                                    <div className='form-group'>
                                        <label htmlFor="url" className="form-label">URL</label>
                                        <input type='text' id='url' placeholder={song[0].url} className='form-control' onChange={(e) => {setSong(prevState => ({...prevState,url:e.target.value})); setNav(true)}}/>
                                    </div>
                                    <br/>
                                    <div className='form-group position-relative'>
                                        <button type="submit" className="btn btn-primary mb-3">Update Song</button>&emsp;
                                        <button type="reset" className="btn btn-danger mb-3 position-absolute top-0 end-0" onClick={()=>setNav(false)}>Reset</button>
                                    </div>
                                </form>
                                <br/>
                            </div>
                        </div>
                    </div>
                </>
            }    
        </>
    )
}