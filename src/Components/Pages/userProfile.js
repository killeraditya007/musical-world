import React from 'react'
import { getLoginState, getCurrUser } from '../../Redux/slice'
import { useSelector } from 'react-redux'
import Man from "../../Assets/Img/man.png"
import { Error } from './error'

export const UserProfile = () => {
    const isLoggedIn = useSelector(getLoginState)
    const user = useSelector(getCurrUser)
    console.log(user)

    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            {!isLoggedIn ?
                    <Error/>
                :
                    <div className="container p-3">
                        <div className="main-body">
                            <div className="row gutters-sm">
                                <div className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <img src={Man} alt="Admin" className="rounded-circle" width="150"/>
                                                <div className="mt-3">
                                                    <h4>{Capitalize(user[0].firstName)} {Capitalize(user[0].lastName)}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {Capitalize(user[0].firstName)} {Capitalize(user[0].lastName)}
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {user[0].email}
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {user[0].phone}
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {user[0].location}
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
