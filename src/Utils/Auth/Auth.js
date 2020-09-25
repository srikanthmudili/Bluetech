import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import './Auth.css';
import firebase from './../../firebase';
import { Redirect } from 'react-router-dom';

const Auth = () => {
    const [showLoginModal, setshowLoginModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({});
    const [showRegisterModal, setRegisterModal] = useState(false);

    const openRegisterModal = () => {
        setRegisterModal(true);
    };
    const handleRegisterClose = () => {
        setRegisterModal(false);
    };

    const openLoginModal = () => {
        setshowLoginModal(true);
    };
    const handleLoginClose = () => {
        setshowLoginModal(false);
    };

    const registerFormik = useFormik({
        initialValues: {
            email: '',
            firstname: '',
            lastname: '',
            phone: '',
            gender: '',
            status: '',
            organisation: '',
            password: ''
        },
        onSubmit: async (values) => {
            console.log(values);
            var ref = await firebase.firestore().collection('users').doc(values.email);

            await ref.get().then(async (doc) => {
                const data = doc.data();
                if (data !== undefined) {
                    window.alert('User Already Exist! Please Login');
                } else {
                    await ref
                        .set({
                            email: values.email,
                            name: values.firstname + ' ' + values.lastname,
                            phone: values.phone,
                            gender: values.gender,
                            status: values.status,
                            organisation: values.organisation,
                            password: values.password,
                            role: 'user',
                            time_stamp: firebase.firestore.FieldValue.serverTimestamp(),
                            os: null
                        })
                        .then(() => handleRegisterClose(), window.alert('account created'));
                }
            });
        }
    });

    const loginFormik = useFormik({
        initialValues: {
            userName: '',
            loginPassword: ''
        },
        onSubmit: async (values) => {
            setLoading(true);
            console.log(values);
            var ref = await firebase.firestore().collection('users').doc(values.userName);

            await ref.get().then(async (doc) => {
                const data = doc.data();
                if (data === undefined) {
                    window.alert("user doesn't exist");
                } else {
                    if (data.password === values.loginPassword) {
                        setLoading(false);
                        setInfo(data);
                    } else {
                        window.alert('Invalid Credentials');
                    }
                }
            });
            // setLoading(false);
        }
    });
    if (info.role === 'admin') {
        return (
            <Redirect
                to={{
                    pathname: '/admin',
                    state: {
                        Info: info
                    }
                }}
            />
        );
    } else if (info.role === 'user') {
        return (
            <Redirect
                to={{
                    pathname: '/userdetails',
                    state: {
                        Info: info
                    }
                }}
            />
        );
    }



    return (
        <div>




            <Modal show={showLoginModal} onHide={handleLoginClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header><h3>Enter Login Credentials</h3></Modal.Header>
                <Form onSubmit={loginFormik.handleSubmit} >
                    <Modal.Body>
                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', verticalAlign: 'middle' }}>
                                <Spinner animation="border" size={50} color="#0A79DF" />
                            </div>
                        ) : (
                                <div />
                            )}{' '}
                        <Form.Group>
                            <Form.Label >Username : </Form.Label>
                            <Form.Control
                                name="userName"
                                id="userName"
                                value={loginFormik.values.userName}
                                onChange={loginFormik.handleChange}
                                type="text"
                                required
                                placeholder="username"
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label >Password : </Form.Label>
                            <Form.Control
                                id="loginPassword"
                                name="loginPassword"
                                value={loginFormik.values.loginPassword}
                                onChange={loginFormik.handleChange}
                                type="password"
                                required
                                placeholder="password"
                                minLength="8"
                            ></Form.Control>
                        </Form.Group>


                    </Modal.Body>
                    <Modal.Footer style={{ alignItems: 'center' }}>
                        <Button type="submit" style={{ width: '30%', marginRight: '36%' }} variant="primary" >
                            Log in
					    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>


            <Modal show={showRegisterModal} onHide={handleRegisterClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header><h3>New Registration</h3></Modal.Header>
                <Form onSubmit={registerFormik.handleSubmit}>

                    <Modal.Body>

                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>First Name :</Form.Label>
                                <Form.Control
                                    name="firstname"
                                    id="firstname"
                                    value={registerFormik.values.firstname}
                                    onChange={registerFormik.handleChange}
                                    type="text"
                                    required
                                    placeholder="First Name" />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Last Name :</Form.Label>
                                <Form.Control
                                    name="lastname"
                                    id="lastname"
                                    value={registerFormik.values.lastname}
                                    onChange={registerFormik.handleChange}
                                    type="text"
                                    placeholder="Last Name" />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} >
                                <Form.Label>Email :</Form.Label>
                                <Form.Control
                                    name="email"
                                    id="email"
                                    value={registerFormik.values.email}
                                    onChange={registerFormik.handleChange}
                                    type="email"
                                    placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Phone :</Form.Label>
                                <Form.Control
                                    name="phone"
                                    id="phone"
                                    value={registerFormik.values.phone}
                                    onChange={registerFormik.handleChange}
                                    type="text"
                                    placeholder="Mobile No" />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Gender :</Form.Label>
                                <br></br>
                                <select
                                    className="btn btn-secondary dropdown-toggle choose-branch-btn"
                                    id="gender"
                                    name="gender"
                                    value={registerFormik.values.gender}
                                    onChange={registerFormik.handleChange}
                                    required
                                >
                                    <option >Select</option>
                                    <option value={"Male"}>Male</option>
                                    <option value={"Female"}>Female</option>
                                    <option value={"Not to say"}>Not to say</option>

                                </select>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>status :</Form.Label>
                                <br></br>
                                <select
                                    className="btn btn-secondary dropdown-toggle choose-branch-btn"
                                    id="status"
                                    name="status"
                                    value={registerFormik.values.status}
                                    onChange={registerFormik.handleChange}
                                    required
                                >
                                    <option >Select</option>
                                    <option value={"Student"}>Student</option>
                                    <option value={"Placed"}>Placed</option>
                                </select>
                            </Form.Group>
                        </Row>
                        <Form.Label>Organisation/Institute :</Form.Label>
                        <Form.Control
                            name="organisation"
                            id="organisation"
                            value={registerFormik.values.organisation}
                            onChange={registerFormik.handleChange}
                            type="text"
                            placeholder="organisation" />


                        <Form.Label>Password :</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            id="password"
                            value={registerFormik.values.password}
                            onChange={registerFormik.handleChange}
                            minLength="8"
                            placeholder="Enter new Password Carefully"
                            required />



                    </Modal.Body>
                    <Modal.Footer >
                        <Button type="submit" style={{ justifyContent: "center", marginRight: '36%', width: '30%' }} variant="primary">
                            Log in
					</Button>
                    </Modal.Footer>
                </Form>
            </Modal>





            <div className="jumbotron">
                <h1 className="display-4">Welcome!</h1>
                <p className="lead">Welcome</p>
                <div className="row justify-content-center">
                    <Button id="button" onClick={() => openLoginModal()} className="btn btn-primary btn-lg">Login</Button>
                    <Button id="button" onClick={() => openRegisterModal()} className="btn btn-primary btn-lg">Register</Button>
                </div>
            </div>
        </div>
    );
};

export default Auth;