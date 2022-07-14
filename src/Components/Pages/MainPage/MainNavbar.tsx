import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {CheckAuth} from "../../Functions/CheckAuth";

const MainNavbar = () => {

    // loader check
    const [checkAuth, setCheckAuth] = useState(false)
    async function getCheck() {
        let check = await CheckAuth()
        setCheckAuth(check)
    }

    console.log(checkAuth)

    if(checkAuth){ window.location.href = "/panel" }

    useEffect(() => {
        getCheck()

    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark main-navbar-page">
            <div className="container-lg">
                <Link className="navbar-brand" to="/">АИС Учета сотрудников</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#authModal"
                            >Авторизоваться</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MainNavbar;
