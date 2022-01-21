import React from 'react'
import { useHistory } from 'react-router-dom'

export const Error = () => {
    const history = useHistory()
    return (
        <>
            <div className='container p-3'>
                <div className='row gutters-sm'>
                    <div className='col-md-6 shadow mx-auto p-5'>
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row"> 
                                    <div className="error-template align-items-center text-center">
                                        <h1>Oops!</h1>
                                        <h2>404 Not Found</h2>
                                        <hr/>
                                        <div className="error-details">
                                            Sorry, an error has occured, Requested page not found!
                                        </div>
                                        <hr/>
                                        <div className="error-actions">
                                            <input type='reset' className="btn btn-primary btn-lg" onClick={()=>{history.push("/")}} value="Take Me Back Home"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
