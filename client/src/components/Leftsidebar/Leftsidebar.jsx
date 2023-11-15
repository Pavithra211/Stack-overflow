import React from 'react'
import './LeftSidebar.css'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.svg'

const LeftSidebar = () => {
    return (
        <div className='left-sidebar'>
            <nav calssName='side-nav'> 
                <NavLink to='/' className='side-nav-links' activeClassname='active'>
                    <p>Home</p>
                </NavLink>
                <div className='side-nav-div'>
                    <div><p>PUBLIC</p></div>
                    <NavLink to='/Questions' className='side-nav-links' activeClassname='active'>
                        <img src={Globe} alt='Globe' />
                        <p  style={{paddingLeft:"10px"}}>Questions</p>
                    </NavLink>
                    <NavLink to="/Tags" className='side-nav-links'  style={{paddingLeft:"40px"}} activeClassname='active'>
                        <p>Tags</p>
                    </NavLink>
                    <NavLink to="/Users" className='side-nav-links'  style={{paddingLeft:"40px"}} activeClassname='active'>
                        <p>Users</p>
                    </NavLink>
                </div>
            </nav>
            

        </div>
    )
}

export default LeftSidebar
