import React, { useState } from "react"
import HeaderComponent from "./HeaderComponent"
import BodyComponent from "./BodyComponent"
import { useSelector } from "react-redux";

function Home(props) {
    const userInfo = useSelector(state => state?.userDetails?.userInfo);
    const [productName,setProductName] = useState(null);
    const [productId,setProductId] = useState(null);
  
  

    return(
        <React.Fragment>
            <HeaderComponent callBack={(name)=>{setProductName(name)}} removeFromSearch={productId} {...props}/>
            <BodyComponent showProduct={productName} removeFromSearch={(id)=>{setProductId(id)}} {...props}/>
        </React.Fragment>
    )
}
export default Home;