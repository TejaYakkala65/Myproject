import React, { useEffect, useState } from "react"
import ProductCard from "./ProductCard";
import isEmpty from "./Utility";


function BodyComponent(props){
    const [products,setProducts] = useState(null);
    const [productInfo,setProductInfo] = useState(null);
    useEffect(()=>{
        getData();
    },[])
    useEffect(()=>{
        if(!isEmpty(props?.showProduct)){
            products?.map((eachProduct) => {
                if(eachProduct.name==props?.showProduct){
                    setProductInfo(eachProduct);
                }
            })
        }else{
            setProductInfo(null);
        }
    },[props.showProduct])
    const removeProduct=(id)=>{
        setProducts(products.map((eachProduct=>{
            if(eachProduct.id != id){
                return eachProduct;
            }
        })));
        if(productInfo?.id==id){
            setProductInfo(null);
        }
        props.removeFromSearch(id);
    }
    const getData = async() => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        fetch("http://localhost:3000/products", requestOptions)
          .then((response) => response.json())
          .then((result) => {setProducts(result); return result})
          .catch((error) => console.log("error", error));
      };
    return (
        <div>
            {productInfo && <div className="container p-4">
                <div className="row">
                <ProductCard productInfo={productInfo} productRemoved={(productId)=>{removeProduct(productId)}}/>
                </div>
                </div>}
            {products && !productInfo && products.map((eachProduct=>{
                return  <div key={eachProduct.id} className="container p-4">
                <div className="row">
                <ProductCard productInfo={eachProduct} productRemoved={(productId)=>{removeProduct(productId)}}/>
                </div>
                </div>
            }))}
        </div>
    )
}
export default BodyComponent;