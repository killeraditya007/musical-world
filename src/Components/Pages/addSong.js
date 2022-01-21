import React, {useState} from 'react'
import { toast } from 'react-toastify'
import { Prompt, useHistory } from 'react-router-dom'
// import {Error} from "./error"
import { db } from '../../firebase'
import {collection, addDoc} from "firebase/firestore"

const initialState = {
    movie:"",
    title:"",
    len:"",
    artist:"",
    genre:"",
    language:"",
    url:""
}

export const AddSong = () => {
    const userCollectionRef = collection(db, "songs")
    const [state, setState] = useState(initialState)
    const [isNav,setNav] = useState(false)
    const history = useHistory()

    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(!state.title || !state.movie ||!state.artist ||!state.len ||!state.genre ||!state.language){
            toast.warning("Fill all fields")
        }
        else{
            console.log(state)
            setNav(false)
            await addDoc(userCollectionRef, state);
            history.push("/")
            setTimeout(()=>toast.success("Song Added Successfully!"),100)
        }
    }
    return (
        <>
            <Prompt when={isNav} message={()=>"Are you sure want to exit without adding song?"}></Prompt>
            <div className='container p-3'>
                <h1 className='display-3 text-center'>Add Song!</h1>
                <div className='row'>
                    <div className='col-md-6 shadow mx-auto p-5'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <input type='text' placeholder='Song Title' onChange={(e) => setState(prevState => ({...prevState,title:Capitalize(e.target.value)}))} className='form-control'/>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <input type='text' placeholder='Album/Movie Name' onChange={(e) => {setState(prevState => ({...prevState,movie:Capitalize(e.target.value)})); setNav(true)}} className='form-control'/>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <input type='text' placeholder='Artist' onChange={(e) => {setState(prevState => ({...prevState,artist:Capitalize(e.target.value)})); setNav(true)}} className='form-control' />
                            </div>
                            <br/>
                            <div className='form-group'>
                                <input type='text' placeholder='Length' onChange={(e) => {setState(prevState => ({...prevState,len:e.target.value})); setNav(true)}} className='form-control'/>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <input type='text' placeholder='Genre' onChange={(e) => {setState(prevState => ({...prevState,genre:Capitalize(e.target.value)})); setNav(true)}} className='form-control' />
                            </div>
                            <br/>
                            <div className='form-group'>
                                <input type='text' placeholder='Language' onChange={(e) => {setState(prevState => ({...prevState,language:Capitalize(e.target.value)})); setNav(true)}} className='form-control' />
                            </div>
                            <br/>
                            <div className='form-group'>
                                <input type='text' placeholder='Song URL (Optional)' onChange={(e) => {setState(prevState => ({...prevState,url:e.target.value})); setNav(true)}} className='form-control'/>
                            </div>
                            <br/>
                            <div className='form-group position-relative'>
                                <button type="submit" className="btn btn-primary mb-3">Add Song</button>&emsp;
                                <button type="reset" className="btn btn-danger mb-3 position-absolute top-0 end-0" onClick={()=>setNav(false)}>Reset</button>
                            </div>
                        </form>
                        <br/>
                    </div>
                </div>
            </div>
        </>
    )
}