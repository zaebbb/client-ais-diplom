import React, {useEffect, useState} from 'react';
import logo from "./../../Shared/Images/logo.png"
import {Link} from "react-router-dom";
import {CheckAuth} from "../../Functions/CheckAuth";

const _404 = () => {

    // loader check
    const [checkAuth, setCheckAuth] = useState(false)
    async function getCheck(){
        let check = await CheckAuth()
        setCheckAuth(check)
    }

    useEffect(() => {
        getCheck()
    }, [])

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col-sm-12">
                            <h1>Запрашиваемая вами страница не найдена</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default _404;
