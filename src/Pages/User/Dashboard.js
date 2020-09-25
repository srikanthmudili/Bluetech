import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../Utils/Navbar';
import Todo from './Tabs/Todo';

import todo from './../Helper/userDashboard'
import Completed from './Tabs/Completed';
import Attempted from './Tabs/Attempted';

const Dashboard = (props) => {


    const [userInfo, setUserInfo] = useState({});
    const [userCourses, setUserCourses] = useState([]);

    useEffect(

        function Load() {
            if (props.location.state.Info === undefined)
                return (<Link to='/'></Link>)
            setUserInfo(props.location.state.Info)
            todo(props.location.state.Info.email).then(alldata => {
                setUserCourses(alldata);
            })

        },

        [props.location.state.Info]
    );
    console.log(userCourses)
    const time = (new Date(props.location.state.Info.time_stamp.seconds * 1000));

    return (
        <div>

            <Navbar title={userInfo.name} username={userInfo.email} logoutButton={true} />
            <br></br>
            {(userCourses['attempted']) ? (
                <div style={{ marginTop: '5%', color: "#45CE30", textAlign: "center" }} className="justify-content-center">
                    <h5>No courses taken</h5>
                </div>
            ) : (
                    <Tabs defaultActiveKey="todo" id="uncontrolled-tab-example">
                        <Tab eventKey="todo" title="To-Do">
                            <Todo courses={userCourses["todo"]} />
                        </Tab>
                        <Tab eventKey="Attempted" title="Attempted">
                            <Attempted courses={userCourses["attempted"]} />
                        </Tab>
                        <Tab eventKey="completed" title="Completed">
                            <Completed courses={userCourses["completed"]} />
                        </Tab>
                        <Tab eventKey="log" title="Log Details">
                            <div style={{ marginTop: '5%', color: "#45CE30", textAlign: "center" }} className="justify-content-center">
                                <p>Last Login: {userInfo.os}</p>
                                <p>Logout time: {time.toTimeString()}</p>
                                <p>Logout date: {time.toDateString()}</p>
                            </div>
                        </Tab>

                    </Tabs>
                )}

        </div>
    );
};

export default Dashboard;