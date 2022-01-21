import React, {useEffect} from 'react'
import { db } from '../../firebase'
import { LoginForm } from '../Login-SignUp/loginForm'
import {collection, getDocs} from "firebase/firestore"
import {setUsers} from "../../Redux/slice"
import { useDispatch } from 'react-redux'

export const Login = () => {
    const userCollectionRef = collection(db, "users")
    const dispatch = useDispatch()

    useEffect(() => {
        const getUsers = async() =>{
            const data = await getDocs(userCollectionRef)
            dispatch(setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id}))))
        }
        getUsers()
    }, [])
    return (
        <LoginForm />
    )
}
