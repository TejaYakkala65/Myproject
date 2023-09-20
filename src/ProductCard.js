import React, { useState } from "react";
import productImage from "../src/images/surprise-icon.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo } from "./redux/action/UserActions";
import  isEmpty from './Utility';

const ProductCard = (props) => {
    let { productInfo } = props;
    const userInfo = useSelector(state => state?.userDetails?.userInfo);
    const [disabled,setDisabled] = useState(true);
    const [saveFlag,setSaveFlag] = useState(false);
    const [price,setPrice] = useState(productInfo?.price);
    const [quantity,setQuantity] = useState(productInfo?.quantity);
    const dispatch=useDispatch();
    const remove = (id) => {
        if(isEmpty(userInfo)){
            alert("No Opeartion performed,Please try to Logged In");
            return;
            }
        axios.delete('http://localhost:3000/products/' + id)
        
            .then((response) => {
               
                if (response.status === 200) {
                    alert("removed Successfully");      
                }
               
            
             
            }).catch(function (error) {
                console.log(error)
            })
    }
    const handleSave=()=>{
        
        if(isEmpty(userInfo)){
            setDisabled(true); 
                setSaveFlag(false);
            alert("Can't perform operations, try Logging In....");
            return;
            }
           
        productInfo['price'] = price;
        productInfo['quantity'] = quantity; 
     
        updateProduct().then(response=>{
          
            if(response.status===200){
                alert("Updated Successfully!");
                setDisabled(true); 
                setSaveFlag(false);
            }  
        }).catch(error=>{
            console.log(error);
        })
    }
    const updateProduct=async()=>{
        return await fetch(`http://localhost:3000/products/${productInfo?.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(productInfo)
    })
    }
    return (
        <React.Fragment>
            {productInfo && <div className="card pb-3">
                <div className="d-flex">
                    <div className="d-flex col-8">
                        <img src={productInfo?.image ? productInfo?.image : productImage} className="card-img-top h-75 w-25 pt-3" alt={productInfo?.name} />
                        <div className="card-body">
                            <h5 className="card-title">{productInfo?.name}</h5>
                            <p className="card-text">{productInfo?.description}</p>
                            <p className="card-text">Price: {'\u20B9'}<input disabled={disabled} value={price} onChange={(e)=>{setPrice(e.target.value)}}/></p>
                            <div className="card-text">Quantity: <input disabled={disabled} value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}/></div>
                        </div>
                    </div>
                    <div className="d-flex h-25 m-auto">{
                        saveFlag?<button className="btn btn-outline-primary me-1 flex-grow-1" onClick={()=>{handleSave()}}>Save</button>:<>
                        <button className="btn btn-outline-primary me-1 flex-grow-1" onClick={()=>{setDisabled(false); setSaveFlag(true)}}>Edit</button>
                        <button className="btn btn-outline-primary me-1 flex-grow-1p" onClick={() => { remove(productInfo?.id) }}>Delete</button>
                        </>
                    }
                    </div>
                </div>
            </div>}
        </React.Fragment>
    )
}
export default ProductCard;