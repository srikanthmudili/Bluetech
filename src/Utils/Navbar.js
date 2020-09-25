import React from 'react';
import './Navbar.css';

import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Log from './Log';

const Navbar = (props) => {
    const username=props.username
    return (
        <div className="Navbar">
            <nav className="navbar">
                <span className="navbar-text">
                    Bluetech {props.admin}
                </span>

                {
                    (props.logoutButton) ? (
                        <div className="md-center">
                            <Link to="/">
                                <RiLogoutCircleRLine
                                    type='button'
                                    onClick={()=>Log(username)}
                                    color="white" title="LOGOUT" size={40}>
                                </RiLogoutCircleRLine>
                            </Link>
                        </div>
                    ) : (
                            <div />
                        )

                }
                {(props.title) ? (
                    <div >
                        <h5 style={{ color: "whitesmoke" }}>welcome {props.title}</h5>
                        <p style={{ color: "whitesmoke", fontSize: "12px" }}>Username: {props.username}</p>
                    </div>

                ) : (
                        <div />
                    )}
            </nav>
        </div>
    );
};

export default Navbar;