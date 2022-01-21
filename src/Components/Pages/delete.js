import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getLoginState } from '../../Redux/slice'
import { Error } from './error'
import { db } from '../../firebase'
import { deleteDoc, doc} from "firebase/firestore"
import { toast } from 'react-toastify'
import { GoAlert } from 'react-icons/go';

export const DeleteSong = () => {
    const {id} = useParams()
    const isLoggedIn = useSelector(getLoginState)
    const history = useHistory()
    const handleDelete = async() =>{
        const  selectDoc = doc(db, "songs", id)
        await deleteDoc(selectDoc)
        toast.success("Song Successfully Deleted!")
        setTimeout(() => history.push("/"), 100)
    }
    return (
        <>
            {!isLoggedIn? <Error/> :
                <div className='container'>
                    <div className='row my-5'>
                        <div className='col-md-6 shadow mx-auto p-5'>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row"> 
                                        <div className="error-template align-items-center text-center">
                                            <h1><GoAlert size='2em'/></h1>
                                            <hr/>
                                            <div className="error-details">
                                                Are you sure you want to delete this song?
                                            </div>
                                            <hr/>
                                            <div className="error-actions position-relative my-2">
                                                <button type="submit" className="btn btn-primary mb-3 position-absolute top-0 start-0" onClick={handleDelete}>Delete Song</button>&emsp;
                                                <button type="button" className="btn btn-danger mb-3 position-absolute top-0 end-0" onClick={()=>history.push("/")}>Cancel</button>
                                            </div>
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
