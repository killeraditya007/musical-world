import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import {Home} from "./Components/Pages/home"
import {About} from "./Components/Pages/about"
import {Playlist} from "./Components/Pages/playlist"
import {Error} from "./Components/Pages/error"
import { Header } from './Components/header'
import { AddSong } from "./Components/Pages/addSong"
import { Login } from './Components/Pages/login';
import { RegisterForm } from './Components/Login-SignUp/registerForm'
import { UserProfile } from './Components/Pages/userProfile'
import { EditSong } from './Components/Pages/editSong'
import { DeleteSong } from './Components/Pages/delete'
import { SongDetails } from './Components/Pages/songDetails'
import { useSelector, useDispatch } from 'react-redux'
import { setLogin, getLoginState, setCurrUser, setUsers } from './Redux/slice';
import { db } from './firebase'
import {collection, getDocs} from "firebase/firestore"

export const App = () => {
  const isLoggedIn = useSelector(getLoginState)
  const dispatch = useDispatch()
  const userCollectionRef = collection(db, "users")

  const getUsers = async(email) =>{
    const data = await getDocs(userCollectionRef)
    dispatch(setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id}))))
    const users = data.docs.map((doc)=>({...doc.data(), id: doc.id}))
    dispatch(setCurrUser(users.filter(user => {
        if(user.email===email){
          return user
        }
      }))
    )
    dispatch(setLogin(true))
  }

  useEffect(() => {
    if(!isLoggedIn){
      const email = sessionStorage.getItem("musical-world")
      if(email !== null){
        getUsers(email)
      }
    }
  }, [isLoggedIn])
  return (
    <div>
      <Router>
        <ToastContainer/>
        <Header />
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/addSong" component={AddSong}/>
            <Route exact path="/edit/:id" component={EditSong} />
            <Route exact path="/playlist" component={Playlist}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/delete/:id" component={DeleteSong} />
            <Route exact path="/songs/:id/:title" component={SongDetails} />
            {/* <Route exact path="/genres/:genre" component={GenreList} />
            <Route exact path="/languages/:lan" component={LanguageList} />
            <Route exact path="/addsong" component={AddSong} /> */}
            <Route exact path="/error" component={Error} />
            <Redirect from='*' to='/error'/>
        </Switch>
      </Router>
    </div>
  )
}
