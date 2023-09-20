import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import homeLogo from '../src/images/home.svg';
import profileLogo from '../src/images/profile.svg';
import isEmpty from "./Utility";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "./redux/action/UserActions";

function HeaderComponent(props){
    const [products, setProducts] = useState(null);
    const [listOfSimilarNameProducts, setListOfSimilarNameProducts] = useState(null);
    const [myProfileClicked, setMyProfileClicked] = useState(false);
    const [closeListOfProducts,setCloseListOfProducts] = useState(false);
    const navigate =useNavigate();
    const dispatch=useDispatch();
    
    useEffect(() => {
        getData();
    }, [props.removeFromSearch])
    useEffect(() => {
        setListOfSimilarNameProducts(listOfSimilarNameProducts?.map((eachProduct) => {
            if(eachProduct.id!==props?.removeFromSearch){
                return eachProduct;
            }
        }))
    }, [props.removeFromSearch])
    const getData = async () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        fetch("http://localhost:3000/products", requestOptions)
            .then((response) => response.json())
            .then((result) => setProducts(result))
            .catch((error) => console.log("error", error));
    };
    const handleOnChange = (value) => {
        setCloseListOfProducts(false);
        if(isEmpty(value)){
            setCloseListOfProducts(true);
        }
        setListOfSimilarNameProducts(products.filter((eachProduct) => {
            if (eachProduct?.name?.toLowerCase().includes(value.toLowerCase()))
                return eachProduct;
        }))

    }
    const redirectToProductPage = (eachProduct = {}) => {
        setCloseListOfProducts(true);
        props.callBack(eachProduct?.name);
    }
    const redirectToHome=()=>{
     navigate("/");
    }
    const redirectToViewProfile = () => {
        window.open("viewProfile","_self");
    }

    const redirectToLogIn = () => { 
        dispatch(removeUserInfo());
        window.open("/home", "_self");
        
    }
    const redirectToProduct=()=>{
        navigate("/AddProduct");
    }
    const redirectToAbout=() =>{
        navigate("/About")
    }
    return (
        <div>
            <Form>
                <div className="d-flex justify-content-md-between bg-primary-subtle">
                    <Form.Group>
                        <a href={"/home"}>
                            <img className="col-auto" src={homeLogo} alt=""/>
                        </a>
                    </Form.Group>
                    <Form.Group  className="d-flex">
            <button className="btn card-text" onClick={() => {redirectToAbout()}}>About Us</button>
                    </Form.Group>
                    <Form.Group  className="d-flex">
            <button className="btn card-text" onClick={() => {redirectToProduct()}}>AddProduct</button>
                    </Form.Group>
                   
                    <Form.Group className="d-flex">
                        <Form.Control className="me-1" type="text" placeholder="search for a product" onChange={(e) => { handleOnChange(e.target.value) }} />
                    </Form.Group>
                    <Form.Group>
                        <img classnamemask="col-auto" src={profileLogo} alt="" height={'24px'} width={'24px'} onClick={() => { setMyProfileClicked(!myProfileClicked) }} />
                    </Form.Group>
                </div>
                {myProfileClicked && <div className="card float-sm-end col-1">
                    <div className="card-body float-sm-end">
                        <p className="card-text" onClick={() => { redirectToViewProfile() }}>My Profile</p>
                        <p className="card-text" onClick={() => { redirectToLogIn() }}>Log Out</p>
                        <p className="card-text" onClick={() => { redirectToHome() }}>sign In</p>
                    </div>
                </div>}
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 text-center">
                        {!closeListOfProducts && !isEmpty(listOfSimilarNameProducts) && listOfSimilarNameProducts?.map((eachProduct) => {
                            return !isEmpty(eachProduct) && <div className="card float-end form-control w-75">
                                <div className="card-body">
                                    <button className="btn card-text" onClick={() => {redirectToProductPage(eachProduct) }}>{eachProduct?.name}</button>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="col-3"></div>
                </div>
            </Form>
        </div>
    )
}

export default HeaderComponent;