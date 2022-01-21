import React, {useState} from 'react'
import { FaPlus, FaTrash, FaMusic } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { getLoginState } from '../../Redux/slice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const ActionButton = () => {
    const history = useHistory()
    const isLoggedIn = useSelector(getLoginState)
    const [cssClass, toggleClass] = useState(false)
    const addSong = () =>{
        if(isLoggedIn){
            history.push("/addsong")
        }
        else{
            toast.warning("Login First!")
        }
    }
    const deleteMultiple = () => {
        alert("This Feature is Under Development.")
    }
    const handleClick = () => {
        toggleClass(!cssClass)
    }
    return (
        <>
            <div className="fab-container">
                <div className="fab fab-icon-holder mainBtn position-relative" onClick={() => {handleClick()}}>
                    <span className='position-absolute top-50 start-50 translate-middle'><FaPlus size="20px"/></span>
                </div>

                <ul className={cssClass? "visiable fab-options": "fab-options"}>
                    <li>
                        <span className="fab-label">Delete Multiple Song</span>
                        <div className="fab-icon-holder opt position-relative" onClick={() => {deleteMultiple()}}>
                            <span className='position-absolute top-50 start-50 translate-middle'><FaTrash/></span>
                        </div>
                    </li>
                    <li>
                        <span className="fab-label">Add Song</span>
                        <div className="fab-icon-holder opt position-relative" onClick={() => {addSong()}}>
                            <span className='position-absolute top-50 start-50 translate-middle'><FaMusic/></span>
                        </div>
                    </li>
                </ul>
	        </div>
        </>
    )
}