import { Button, Row } from 'antd';
import logo from "../assets/Image/logo.png"
import React from 'react'
import { AuthContext } from '../AuthContext/AuthContext';

function Navbar() {
  const {handleLogout,isAuth} = React.useContext(AuthContext)
  return (
    <div className='nav-container'>
        <Row>
            <img className='logo' src={logo} alt="" />
        </Row>
        <Row className='nav-btn-container'>
           { isAuth&&<Button className='nav-button' type='primary' onClick={handleLogout}>Logout</Button>}
        </Row>
        
    </div>
  )
}

export default Navbar