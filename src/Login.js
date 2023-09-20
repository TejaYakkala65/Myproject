import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { addUserInfo, removeUserInfo } from './redux/action/UserActions';
import isEmpty from './Utility';
import { useNavigate } from 'react-router';


function Login() {
    
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getData = async () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        return fetch("http://localhost:3000/users", requestOptions)
            .then((response) => response.json())
            .then((result) => { return result })
            .catch((error) => console.log("error", error));
    };

    const validateAndRedirectToHome = async(e) => {
        e.preventDefault();
        if(isEmpty(userName) || isEmpty(password)){
            alert("please provide username and password to log in");
            return;
        }
        
        const userInfos = await getData();
        dispatch(removeUserInfo());
        userInfos.map((eachUser) => {
            if (eachUser.userName.toLowerCase() == userName.toLowerCase() && eachUser.password == password) {
                dispatch(addUserInfo(eachUser));
                navigate("/home")
                return;
            }
        })
        alert("please check user name and password")
        return;
    }
    return (
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <Card className="px-4">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-2 text-center text-uppercase ">
                                    Log In
                                </h2>
                                <div className="mb-3">
                                    <Form>
                                        <Form.Group className="mb-3" controlId="Name">
                                            <Form.Label className="text-center">Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Name" onChange={(e) => { setUserName(e.target.value) }} />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicCheckbox"
                                        ></Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicPassword"
                                        >
                                            <Form.Label className="text-center">Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                                        </Form.Group>
                                        <div className="d-grid m-lg-5">
                                            <Button variant="primary" type="submit" onClick={(e) => { validateAndRedirectToHome(e) }}>
                                                Log In
                                            </Button>
                                        </div>
                                        <div className='text-center'>
                                            <p>Dont have an account? Try clicking below button</p>
                                        </div>
                                        <div className="d-grid">
                                            <Button variant="primary" onClick={() => { navigate("signUp") }}>
                                                Create an account
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
};
export default Login;