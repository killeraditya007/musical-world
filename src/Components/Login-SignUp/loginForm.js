import React, {useState} from 'react'
import { toast } from 'react-toastify'
import { useSelector,useDispatch } from 'react-redux'
import { getAllUsers, setLogin, setCurrUser } from '../../Redux/slice'
import { Link, useHistory } from 'react-router-dom'
import GoogleLogin from "react-google-login";
import { db } from '../../firebase'
import {collection, addDoc} from "firebase/firestore"


const initialState = {
    email:'',
    name:'',
    src:''
}

export const LoginForm = () => {
    const dispatch = useDispatch()
    const users = useSelector(getAllUsers)
    const userCollectionRef = collection(db, "users")
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")

    const handleSuccess = async(result) =>{
        // console.log(result)
        const mail = result.profileObj.email
        if(users.find(user => user.email === mail && mail)){
            toast.success("Login Success")
                dispatch(setCurrUser(users.filter(user => {
                    if(user.email===mail){
                        sessionStorage.setItem("musical-world", mail)
                        return user
                    }})))
                dispatch(setLogin(true))
                history.push("/")
        }
        else{
            const data = {
                email:result.profileObj.email,
                password:"N/A",
                firstName:result.profileObj.givenName,
                lastName:result.profileObj.familyName,
                phone:null,
                location:"N/A"
            }
            await addDoc(userCollectionRef, data);
            dispatch(setLogin(true))
            dispatch(setCurrUser([data]))
            sessionStorage.setItem("musical-world", data.email)
            history.push("/")
            setTimeout(()=>toast.success("Login Success"),100)
        }
    }
    const handleFailure = (result) =>{
        console.log(result)
    }
    
    const handleSubmit= (e) =>{
        e.preventDefault()
            if(!email || !pwd){
                return toast.warning("Fill all fields.")
            }        

        if(users.find(user => user.email === email && email)){
            if(users.find(user => user.password === pwd && pwd)){
                toast.success("Login Success")
                dispatch(setCurrUser(users.filter(user => {
                    if(user.email===email){
                        sessionStorage.setItem("musical-world", user.email)
                        return user
                    }})))
                dispatch(setLogin(true))
                history.push("/")
            }
            else{
                return toast.error("Email or Password is Incorrect!")
            }
        }
        else{
            return toast.error("Email doesn't exists! Login again or Sign Up")
        }


    }
    return (
        <>
            <div className='container p-5'>
                <h1 className='display-3 text-center'>Login</h1>
                <div className="row my-3"> 
                    <div className="error-template align-items-center text-center">
                        <GoogleLogin 
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Login with Google"
                            onSuccess={handleSuccess}
                            onFailure={handleFailure}
                            cookiePolicy="single_host_origin"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 shadow mx-auto p-5'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <input type='email' placeholder='Email' name='email' className='form-control' onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <input type='password' placeholder='Password' className='form-control' onChange={(e) => setPwd(e.target.value)}/>
                            </div>
                            <br/>
                            <div className='form-group position-relative'>
                                <button type="submit" className="btn btn-primary mb-3">Login</button>&emsp;
                                <button type="reset" className="btn btn-danger mb-3 position-absolute top-0 end-0" onClick={() => history.push("/")}>Cancel</button>
                            </div>
                        </form>
                        <br/>
                        <strong>Don't have an account, then please do <Link to="/register">Sign Up</Link></strong>
                    </div>
                </div>
            </div>
        </>
        
    )
}