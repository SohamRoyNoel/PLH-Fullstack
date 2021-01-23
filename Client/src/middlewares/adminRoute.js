import React from 'react';
import jwt_decode from "jwt-decode";
import { Route } from 'react-router-dom';

export default function AdminRoute({ Component, ...rest }) {
    return (
        <Route 
            {...rest}
            render={(props)=>{
                if(!localStorage.getItem('_jid')){
                    window.location.href = "/login";
                } else {
                    console.log("Egg is love");
                    const decoded = jwt_decode(localStorage.getItem('_jid'));
                    if(decoded.userRole === "Admin"){
                        return <Component />;
                    } else {
                        window.location.href = "/login";
                    }                       
                }
            }}
        />
    )
}