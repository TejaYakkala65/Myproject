import React, { useState } from "react"
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { addUserInfo, removeUserInfo } from "./redux/action/UserActions";
import isEmpty from "./Utility";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function SignUp()  {
    const [userName,setUserName] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [mobileNumber,setMobileNumber] = useState(null);
    const [passwordMatchFlag,setPasswordMatchFlag] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        return response.json()
      }
    const validateFormAndSubmit=()=>{
        if(isEmpty(email) || isEmpty(password) || isEmpty(userName) || isEmpty(mobileNumber)){
            alert("please check and verify the fields");
            return
        }
        if(passwordMatchFlag){
            postData("http://localhost:3000/users",{userName,email,password,mobile:mobileNumber})
            dispatch(removeUserInfo());
            dispatch(addUserInfo({userName,email,password,mobile:mobileNumber}))
            navigate("/")
        }else{
            alert("confirm password should be same");
        }
    }
    const validateAndSetPassword=(value)=>{
        if(password===value){
            setPasswordMatchFlag(true);
        }else{
            setPasswordMatchFlag(false);
        }
    }

    return (
        <React.Fragment>
            <div>
                <Container>
                    <Row className="vh-100 d-flex justify-content-center align-items-center">
                        <Col md={8} lg={6} xs={12}>
                            <Card className="px-4">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-center text-uppercase ">
                                            Sign Up
                                        </h2>
                                        <div className="mb-3">
                                            <Form>
                                                <Form.Group className="mb-3" controlId="Name">
                                                    <Form.Label className="text-center">Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Name"  onChange={(e)=>{setUserName(e.target.value)}}/>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center">
                                                        Email address
                                                    </Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
                                                </Form.Group>

                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicPassword"
                                                >
                                                    <Form.Label className="text-center">Mobile Number</Form.Label>
                                                    <Form.Control type="number" minLength={'10'} maxLength={'10'} placeholder="Mobile Number" onChange={(e)=>{setMobileNumber(e.target.value)}}/>
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
                                                    <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicPassword"
                                                >
                                                    <Form.Label className="text-center">Confirm Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" onChange={(e)=>{validateAndSetPassword(e.target.value)}}/>
                                                </Form.Group>
                                                <div className="d-grid">
                                                    <Button variant="primary" type="submit" onClick={()=>{validateFormAndSubmit()}}>
                                                        Create Account
                                                    </Button>
                                                </div>
                                            </Form>
                                            <div className="mt-3">
                                                <p className="mb-0  text-center">
                                                    Already have an account??{' '}
                                                    <a href="/" className="text-primary fw-bold">
                                                        Sign In
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default SignUp;