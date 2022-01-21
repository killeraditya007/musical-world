import React, {useState, useEffect} from 'react'
import Notes from "../Assets/Img/music-note.png"
import Rockstar from "../Assets/Img/Rockstar.png"
import { Link, useLocation, useHistory  } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setLogin, getLoginState } from '../Redux/slice';
import UserLogo from "../Assets/Img/user.png"
import { toast } from 'react-toastify';


export const Header = () => {
    const [activeTab, setactiveTab] = useState("Home")
    const isLoggedIn = useSelector(getLoginState)
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if(location.pathname === "/"){
            setactiveTab("Home")
        }
        else if(location.pathname === "/about"){
            setactiveTab("About")
        }
        else if(location.pathname === "/login"){
            setactiveTab("Login")
        }
    }, [location])
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <img
                        alt=""
                        src={Rockstar}
                        width="30"
                        height="30"
                        className="d-inline-block align-top me-2"
                    />
                    <Link className="navbar-brand" to="/">MusicalWorld
                        <img
                            alt=""
                            src={Notes}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={ activeTab === "Home" ? "nav-link active" : "nav-link"} onClick={()=> setactiveTab("Home")} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={ activeTab === "About" ? "nav-link active" : "nav-link"} onClick={()=> setactiveTab("About")} to="/about">About</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Playlist</span>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/playlist">Playlist 1</Link></li>
                                    <li><Link className="dropdown-item" to="/playlist">Playlist 2</Link></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><Link className="dropdown-item" to="/playlist">Create playlist + </Link></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" size='30' type="search" disabled={ activeTab !== "Home" ? true : false }  placeholder="Tiltle, Movie/Album, Artist" onChange={(e) => dispatch(setSearch(e.target.value))} aria-label="Search"/>
                        </form>
                        <ul className="navbar-nav">
                            {isLoggedIn ? 
                                <li className="nav-item dropdown">
                                    <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img
                                            alt=""
                                            src={UserLogo}
                                            width="30"
                                            height="30"
                                            className="d-inline-block align-top"
                                        />
                                    </span>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                                        <li><span className="dropdown-item" onClick={() => {dispatch(setLogin(false)); history.push("/"); sessionStorage.removeItem("musical-world"); return toast.success("You have successfully logged out!");}}>Sign Out</span></li>
                                    </ul>
                                </li>
                                :
                                <li className="nav-item">
                                    <Link className={ activeTab === "Login" ? "nav-link active" : "nav-link"} onClick={()=> setactiveTab("Login")} aria-current="page" to="/login">Login/Register</Link>
                                </li>
                            }
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

