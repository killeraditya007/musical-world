import React from 'react'
import Avatar from "../../Assets/Img/avatar.png"
import { FaUser, FaCode } from 'react-icons/fa';

export const About = () => {
    return (
        <>
            <div className="container">
                <div className="row gy-4 my-3">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={Avatar} alt="Admin" className="rounded-circle" width="150"/>
                                    <div className="mt-3">
                                        <h4>Aditya Kumar</h4>
                                        <p className="text-secondary mb-1">Noob Programmer</p>
                                        <p className="text-muted font-size-sm">Anime Lover, Football, Drawing</p>
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
                                        Aditya Kumar
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        aditya.kumar50@wipro.com
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Mobile</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        9546807459
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        Patna, Bihar, Pin - 800014
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Description</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        Well, I'm a fresher. This is my first project in React. I didn't understand much in React Testing but I'll try my best to meet all the requirements.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gutters-sm mt-4">
                    <div className="col-md-4 mb-3">
                        <div className="card mt-3">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><FaCode/> Code Chef</h6>
                                    <a className="text-secondary" target='_blank' rel = "noopener noreferrer" href='https://www.codechef.com/users/aditya_kr_007'>aditya_kr_007</a>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><FaCode/> Leet Code</h6>
                                    <a className="text-secondary" target='_blank' rel = "noopener noreferrer" href='https://leetcode.com/Itachi_Uchiha_club/'>Itachi_Uchiha_club</a>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><FaUser/> LinkedIn</h6>
                                    <a className="text-secondary" target='_blank' rel = "noopener noreferrer" href='https://www.linkedin.com/in/aditya-kumar-b83681170/'>aditya-kumar</a>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><FaUser/> Facebook</h6>
                                    <span className="text-secondary">N/A</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><FaUser/> Instagram</h6>
                                    <span className="text-secondary">N/A</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <h4 className="align-items-center text-center">Acknowledgement</h4>
                                </div>
                                <div className="row">
                                    <div className=" text-secondary">
                                    <strong>I would like to express my special thanks to my teacher Srinivasan Mahadevan and Anantha K N who gave me this opportunity to do this wonderful project, 
                                        which also helped me in doing a lot of Research and I came to know about so many new things I'm really thankful to them.</strong>
                                    </div>
                                </div>
                                <div className="row">
                                    <h5 className="align-items-center text-center">Special Thanks</h5>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">YouTube : </h6>
                                    </div>
                                    <a className="text-secondary col-sm-9" target='_blank' rel = "noopener noreferrer" href='https://www.youtube.com/channel/UChPxqdfDbulLE9PyUqhijWw'><strong>Dipesh Malvia</strong></a>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Icons : </h6>
                                    </div>
                                    <a className="text-secondary col-sm-9" target='_blank' rel = "noopener noreferrer" href='https://www.flaticon.com/'><strong>Flaticon</strong></a>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">React Libraries : </h6>
                                    </div>
                                    <a className="text-secondary col-sm-2" target='_blank' rel = "noopener noreferrer" href='https://www.npmjs.com/package/react-toastify'><strong>Toastify</strong></a>
                                    <a className="text-secondary col-sm-2" target='_blank' rel = "noopener noreferrer" href='https://react-bootstrap.github.io/'><strong>Bootstrap</strong></a>
                                    <a className="text-secondary col-sm-3" target='_blank' rel = "noopener noreferrer" href='https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react'><strong>Font Awsome</strong></a>
                                    <a className="text-secondary col-sm-2" target='_blank' rel = "noopener noreferrer" href='https://react-redux.js.org/'><strong>Redux & Router</strong></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
