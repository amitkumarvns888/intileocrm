import React, { Component, useState, useEffect } from 'react'
import Avatar from '../crmimage/Avatar.png'
import profile from '../crmimage/profile.png'
import wallet from '../crmimage/Wallet.png'
import logout from '../crmimage/Logout.png'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_HEADER } from '../Config';
const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("")
    const [notifications, setNotifications] = useState([]);
    useEffect(function () {
        const nameString = sessionStorage.getItem('username');
        const name = JSON.parse(nameString);
        setUser(name)
    }, [])


    useEffect(() => {
        // Fetch notifications from the backend API
        axios.get('https://intileo-tech.info/api/user/notifications/get-user-notification', API_HEADER)

            .then(response => {


                // Update the state with the fetched notifications
                setNotifications(response.data.data);
                console.log("notifications", response.data.data)
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });
    }, []);


    const logoutbutton = async () => {
        //  try {
        //      const response = await axios.post('https://intileo-tech.info/api/user/logout');

        //      console.log(response.data); 

        //      navigate('/')

        //  } catch (error) {
        //      console.error('Error logging out: ', error);

        //  }
        sessionStorage.clear();
        navigate("/signin")
    };

    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
                    </li>
                </ul>
                {/* SEARCH FORM */}
                <form className="form-inline ml-3">
                    <div className="input-group input-group-sm">
                        <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-navbar" type="submit">
                                <i className="fas fa-search" />
                            </button>
                        </div>
                    </div>
                </form>
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    {/* Messages Dropdown Menu */}

                    {/* Notifications Dropdown Menu */}
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <i className="far fa-bell" />
                            <span className="badge badge-warning navbar-badge">{notifications.length} </span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header float-start">Notifications</span>
                            <div className="dropdown-divider" />

                            {notifications.map(notification => (
                                <a href="#" className="dropdown-item">
                                    <img src={notification.logo} alt="logo"/> {notification.title}
                                    <span className="float-right text-muted text-sm">{notification.time} mins</span>

                                </a>
                                
                            ))}
                            
                            {/* <a href="#" className="dropdown-item">
                                <i className="fas fa-users mr-2" /> 8 friend requests
                                <span className="float-right text-muted text-sm">12 hours</span>
                            </a> */}
                            {/* <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-file mr-2" /> 3 new reports
                                <span className="float-right text-muted text-sm">2 days</span>
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a> */}
                        </div>
                    </li>
                    {/* user profile */}
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            {/* <i className="far fa-user" /> */}
                            <img src={Avatar} />


                            <span className="caret" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <img src={Avatar} className='profileimgright' />
                            <span className="dropdown-item dropdown-header profilename">{user}<button onClick={logoutbutton}> <img src={logout} /> </button>    </span>

                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item"><img src={profile} />        Profile</a>
                            <Link to="/sender" className="dropdown-item"> <img src={profile} /> Sender Domain IPs</Link>
                            <a href="#" className="dropdown-item"> <img src={wallet} /> Select Language</a>
                        </div>
                    </li>

                </ul>
            </nav>
        </div>

    )
}
export default Header