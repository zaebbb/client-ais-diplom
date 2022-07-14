import React from 'react';
import axios from "axios";
import {parseData} from "../../Functions/ParseData";

const ExitPage = () => {

    axios.get(process.env.REACT_APP_API_SERVER + "service-api/logout", {
        headers: {
            "user-token": parseData().auth
        }
    })

    const obj = {
        "auth": "",
        "roles": []
    }
    localStorage.setItem("auth", JSON.stringify(obj));

    window.location.href = "/"

    return (
        <div>
            
        </div>
    );
};

export default ExitPage;
