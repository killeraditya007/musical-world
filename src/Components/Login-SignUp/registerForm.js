import React, {useState} from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Prompt, Link, useHistory } from 'react-router-dom'
import { getAllUsers } from '../../Redux/slice'
import { db } from '../../firebase'
import {collection, addDoc} from "firebase/firestore"

const initialState = {
    email:"",
    password:"",
    firstName:"",
    lastName:"",
    phone:null,
    location:""
}

export const RegisterForm = () => {
    const history = useHistory()
    const userCollectionRef = collection(db, "users")
    const users = useSelector(getAllUsers)
    const [user, setUser] = useState(initialState)
    const [isNav,setNav] = useState(false)
    const handleSubmit= async(e) =>{
        e.preventDefault()
        if(!user.email || !user.password || !user.password || !user.firstName || !user.lastName || !user.phone || !user.location){
            return toast.warning("Fill all fields.")
        }        

        if(!/^[a-zA-Z ]{2,15}$/.test(user.firstName)){
            return toast.warning("First Name must be Alphabet and Length (2-15)")
        }
        if(!/^[a-zA-Z ]{2,15}$/.test(user.lastName)){
            return toast.warning("Last Name must be Alphabet and Length (2-15)")
        }
        if(!/^[6-9]\d{9}$/.test(user.phone)){
            return toast.warning("Number must be 10 Digit (Number must start with /6-9/")
        }
        if(!/^[a-zA-Z ]{3,30}$/.test(user.location)){
            return toast.warning("Location must be Alphabet and Length (3-15)")
        }

        if(users.find(u => u.email === user.email && user.email)){
            return toast.error("Account with this Email already Exists!")
        }
        else{
            await addDoc(userCollectionRef, user);
            setNav(false)
            history.push("/login")
            setTimeout(()=>toast.success("Your account is successfully registered!"),100)
        }

    }
    return (
        <>
            <Prompt when={isNav} message={()=>"Are you sure you want to exit without registering yourself?"}></Prompt>
            <div className='container p-3'>
            <h1 className='display-3 text-center'>Register Your Self!</h1>
            <div className='row'>
                <div className='col-md-6 shadow mx-auto p-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input type='email' placeholder='Email' className='form-control' onChange={(e) => {setUser(prevState => ({...prevState,email:e.target.value})); setNav(true)}}/>
                        </div>
                        <br/>
                        <div className='form-group'>
                            <input type='password' placeholder='Password' className='form-control' onChange={(e) => {setUser(prevState => ({...prevState,password:e.target.value})); setNav(true)}}/>
                        </div>
                        <br/>
                        <div className='form-group'>
                            <input type='text' placeholder='First Name' className='form-control' onChange={(e) => {setUser(prevState => ({...prevState,firstName:e.target.value})); setNav(true)}}/>
                        </div>
                        <br/>
                        <div className='form-group'>
                            <input type='text' placeholder='Last Name' className='form-control' onChange={(e) => {setUser(prevState => ({...prevState,lastName:e.target.value})); setNav(true)}}/>
                        </div>
                        <br/>
                        <div className='form-group'>
                            <input type='number' placeholder='Number' className='form-control' onChange={(e) => {setUser(prevState => ({...prevState,phone:e.target.value})); setNav(true)}}/>
                        </div>
                        <br/>
                        <div className='form-group'>
                            <input type='text' placeholder='Location' className='form-control' onChange={(e) => {setUser(prevState => ({...prevState,location:e.target.value})); setNav(true)}}/>
                        </div>
                        <br/>
                        <div className='form-group position-relative'>
                            <button type="submit" className="btn btn-primary mb-3">Register</button>&emsp;
                            <button type="reset" className="btn btn-danger mb-3 position-absolute top-0 end-0" onClick={()=>setNav(false)}>Reset</button>
                        </div>
                    </form>
                    <br/>
                    <strong>If you have an account, then please <Link to="/login">Login</Link></strong>
                </div>
            </div>
        </div>
        </>
        
    )
}