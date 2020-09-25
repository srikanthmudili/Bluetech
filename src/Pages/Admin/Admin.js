import React, { useState, useEffect } from 'react'
import Navbar from '../../Utils/Navbar'

const Admin = (props) => {
    const [info, setInfo] = useState();

    useEffect(
        async function Load() {
            setInfo(props.location.state.Info)

        },
        [props.location.state.Info]
    )
    console.log(info);

    return (
        <div>
            <Navbar
                title={props.location.state.Info.name}
                username={props.location.state.Info.email}
                logoutButton={true}
            />
        </div>
    );
};

export default Admin;