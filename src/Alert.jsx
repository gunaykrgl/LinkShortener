import React from "react";

import './Alert.css'

export default function Alert(props){
    return (
        <div className="alert">
            <p>{props.text}</p>
        </div>
        )
}
