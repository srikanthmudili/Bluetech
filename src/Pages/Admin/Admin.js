import React, { useState, useEffect } from 'react'
import Navbar from '../../Utils/Navbar'

const Admin = (props) => {
    const [info, setInfo] = useState();
    useEffect(
        function log() {
            setInfo(props.location.state.Info)
        }
        [props.location.state.Info]
    )
    console.log(props.location.state.Info);

    return (
        <div>
            <Navbar  logoutButton={true} />
        </div>
    );
};

export default Admin;