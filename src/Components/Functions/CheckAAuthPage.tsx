import React from 'react';
import {CheckAuth} from "./CheckAuth";

const CheckAuthPage = (check = false) => {
    if(!check){
        window.location.href = "/"
    }

};

export default CheckAuthPage;
