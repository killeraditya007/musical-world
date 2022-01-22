import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getLoginState, getSelectedSong } from "../../Redux/slice"
import { Error } from "./error"
import Disk from "../../Assets/Img/cd.png"

export const SongDetails = () => {
    const history = useHistory()
    const isLoggedIn = useSelector(getLoginState)
    const song = useSelector(getSelectedSong)
    return (
        <>
            {!isLoggedIn? <Error/>:
                <div className='container p-3'>
                    <div className='row gutters-sm'>
                        <div className='col-md-6 shadow mx-auto p-5'>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="align-items-center text-center">
                                            <img src={Disk} alt="Admin" className="rounded-circle" width="150" height="150"/>
                                        </div>
                                        <hr/>
                                        <div className="align-items-center text-center">
                                            <h6 className='mb-0'>Title : <span className='text-secondary'>{song[0].title}</span></h6>
                                        </div> 
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="align-items-center text-center">
                                            <h6 className='mb-0'>Movie/Album : <span className='text-secondary'>{song[0].movie}</span></h6>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="align-items-center text-center">
                                            <h6 className='mb-0'>Artist/Singer : <span className='text-secondary'>{song[0].artist}</span></h6>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="align-items-center text-center">
                                            <h6 className='mb-0'>Genre : <span className='text-secondary'>{song[0].genre}</span></h6>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="align-items-center text-center">
                                            <h6 className='mb-0'>Length : <span className='text-secondary'>{song[0].len}</span></h6>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="align-items-center text-center">
                                            <h6 className='mb-0'>Language : <span className='text-secondary'>{song[0].language}</span></h6>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="align-items-center text-center">
                                            <h6 className='mb-0'>URL : <span className='text-secondary'><a href={song[0].url} rel = "noopener noreferrer" target="_blank">{song[0].url!==''? song[0].title : ''}</a></span></h6>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="align-items-center text-center">
                                            <input type='reset' className="btn btn-dark btn-lg" onClick={()=>{history.push("/")}} value="Back"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
