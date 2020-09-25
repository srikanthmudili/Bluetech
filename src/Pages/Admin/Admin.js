import React, { useState, useEffect } from 'react'
import { Accordion, Button, Card, Spinner, Table } from 'react-bootstrap';
import Navbar from '../../Utils/Navbar'
import Courses from '../Helper/admin';
import firebase from './../../firebase'
import './../User/Tabs/Tab.css'

const Admin = (props) => {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState([]);
    const [users, setUsers] = useState([]);
    var noUsers = true;
    var noCourses = true
    useEffect(
        async () => {
            const users = []
            const uRef = firebase.firestore().collection('users')
            await uRef.get().then((querySnapshot) => {
                querySnapshot.docs.forEach((doc) => {
                    users.push(doc.data())

                });
                setUsers(users)
                if (users.length !== 0) {
                    noUsers = false
                }

            })
        },
        [props.location.state.Info]
    )


    const userData = (email) => {
        
        Courses(email).then(
            (alldata) => {
                setInfo(alldata);
                setLoading(false);
            }
        )
        

    }


    return (
        <div>
            
            <Navbar
                admin={"Admin"}
                title={props.location.state.Info.name}
                username={props.location.state.Info.email}
                logoutButton={true}
            />
            {
                users ? (
                    <div className="Card">
                        <Accordion >

                            {
                                users.map(
                                    (obj, i) => (

                                        <Card key={i + 1}>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" onClick={() =>{ userData(obj.email);setLoading(true)}} eventKey={i + 1}>
                                                    {i + 1}.     {obj.name}
                                                </Accordion.Toggle>
                                                <h6 style={{ float: 'right' }}>{obj.email}</h6>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={i + 1}>
                                                <Card.Body>
                                                    <Table striped bordered hover size="sm" responsive>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Course Name</th>
                                                                <th>Completed</th>
                                                                <th>Attempted</th>
                                                                <th>Due Date</th>
                                                                <th>Completed Date</th>
                                                                <th>Points Earned</th>
                                                            </tr>
                                                        </thead>
                                                        {loading ? (
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <Spinner animation="border" size={50} color="#0A79DF" />
                                                            </div>
                                                        ) : (
                                                                <div />
                                                            )}{' '}

                                                        {
                                                            (info.length) ? (
                                                                <tbody >
                                                                    {
                                                                        info.map(
                                                                            (co, j) => (
                                                                                <tr>
                                                                                    <td>{j + 1}</td>
                                                                                    <td>{co.course_name}</td>
                                                                                    <td>{co.is_completed ? "Yes" : "No"}</td>
                                                                                    <td>{co.is_attempted ? "Yes" : "No"}</td>
                                                                                    <td>{co.due_date}</td>
                                                                                    <td>{co.is_completed ? co.completed_date : "Not yet Completed"}</td>
                                                                                    <td>{co.is_completed ? co.points_earned : "Not yet Completed"}</td>
                                                                                </tr>
                                                                            )
                                                                        )
                                                                    }
                                                                </tbody>
                                                            ) : (
                                                                    <div
                                                                        style={{ marginTop: '5%', color: '#45CE30', textAlign: 'center' }}
                                                                        className="justify-content-center"
                                                                    >
                                                                        <h5>No courses taken</h5>
                                                                    </div>
                                                                )
                                                        }

                                                    </Table>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    )
                                )
                            }
                        </Accordion>
                    </div>
                ) : (
                        null
                    )
            }
        </div>
    );
};

export default Admin;