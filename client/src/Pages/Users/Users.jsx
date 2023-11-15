import React from "react"
import { useLocation } from 'react-router-dom'
import './Users.css'
import LeftSidebar from '../../components/Leftsidebar/Leftsidebar'
import UsersList from "./UsersList"

const Users = () =>{

    const location = useLocation()

    

    return(
        <div className="home-container-1">
            <LeftSidebar />
            <div className=".home-container-2" style={{marginTop: "50px", marginBottom:"30px", marginLeft: "20px"}}>
                <h1 style={{fontWeight:"400"}}>Users</h1>
                <UsersList />

            </div>
           

        </div>
    )
}

export default Users