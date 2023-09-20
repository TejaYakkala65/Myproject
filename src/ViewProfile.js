import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import homeLogo from '../src/images/home.svg';
import isEmpty from "./Utility";
import { useNavigate } from "react-router";
import axios from "axios";
function ViewProfile(props) {
    const userInfo = useSelector(state => state?.userDetails?.userInfo);
    const [mobile,setMobileNumber]=useState(userInfo?.mobile);
    const [email,setEmail] =useState(userInfo?.email);
    const [disabled,setDisabled] = useState(true);
    const [saveFlag,setSaveFlag] = useState(false);
    const navigate = useNavigate()
    useEffect(()=>{
        if(isEmpty(userInfo)){
            console.log(userInfo)
            window.open("http://localhost:3000/unAuthorized","_self");
        }
    },[])
    const remove = (id) => {
        axios.delete('http://localhost:3000/users/' + id)
            .then((response) => {
                if (response.status == 200) {
                    alert("removed Successfully");
                    
                }
            }).catch(function (error) {
                console.log(error)
            })
    }
    const handleSave=()=>{
        userInfo['mobile'] = mobile;
        userInfo['email'] = email; 
        updateProduct().then(response=>{
            if(response.status==200){
                alert("Updated Successfully!");
                setDisabled(true); 
                setSaveFlag(false);
            }
        }).catch(error=>{
            console.log(error);
        })
    }
    const updateProduct=async()=>{
        return await fetch(`http://localhost:3000/users/${userInfo?.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    }
    return (
        <React.Fragment>
            {userInfo!=null && <section class="min-vh-100 align-items-center justify-content-center overflow-hidden" style={{"background-color" : "#9de2ff"}}>
            <img style={{"background-color" : "#9de2ff"}} src={homeLogo} alt="Go Home" onClick={()=>{navigate("/home")}}/>
                <div class="row">
                    <div className="col-3"></div>
                    <div class="col-6">
                        <div class="card rounded-4">
                            <div class="card-body p-4">
                                <div className="row">
                                    <div className="col-4">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                            alt="Generic placeholder image" class="w-100" />
                                    </div>
                                    <div className="col-8">
                                        <h5 class="mb-1">{userInfo?.userName}</h5>
                                        <div style={{"background-color": "#efefef"}}>
                                            <div className="row">
                                                <div className="col">
                                                    <p class="small text-muted mb-1">Phone Number</p>
                                                    <p class="mb-0"><input type="text" value={mobile} onChange={(e)=>{setMobileNumber(e.target.value)}}/></p>
                                                </div>
                                                <div className="col">
                                                    <p class="small text-muted mb-1">Email ID</p>
                                                    <p class="mb-0"><input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row pt-5">{
                        saveFlag?<button className="col text-center" onClick={()=>{handleSave()}}>Save</button>:<>
                        <button className="btn btn-outline-danger w-75" onClick={()=>{setDisabled(false); setSaveFlag(true)}}>Edit</button>
                        <button className="btn btn-outline-danger w-75" onClick={() => { remove(userInfo?.id) }}>Remove</button>
                        </>
                    }
                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3"></div>
                </div>
            </section>}
        </React.Fragment>
    )
}

export default ViewProfile;  
