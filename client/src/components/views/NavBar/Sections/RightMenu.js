import React, { useEffect } from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter,RouteProps,Route } from 'react-router-dom';
import { useSelector } from "react-redux";


function RightMenu(props) {
  
  
 
  const user = useSelector(state => state.user)
  // console.log(user)
  // let name = User.find({'_id':localStorage.getItem('userId')})
  // console.log(name)
  
   


    const logoutHandler = () => {
      
       axios.get(`${USER_SERVER}/logout`).then(response => {
        if (response.status === 200) {
          //  props.history.push("/login");
           localStorage.removeItem('userId');
           window.location.reload();
            //props.history.push("/login");
         
        } else {
          alert('Log Out Failed')
        }
      });
      
  }

  
  
  if (user.userData && !user.userData.isAuth) {
    
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="user">
        {user.userData && <h3>Welcome {user.userData.name}</h3>}
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default RightMenu;

