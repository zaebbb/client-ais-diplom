import React, {useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";
import logo from "./../../Shared/Images/logo.png"
import {Link} from "react-router-dom";
import {parseData} from "../../Functions/ParseData";
import QrScanner from "qr-scanner"

const AdminNavbar = () => {

    const contentHead = document.head.innerHTML

    // loader check
    const [checkAuth, setCheckAuth] = useState(true)
    async function getCheck(){
        let check = await CheckAuth()
        await setCheckAuth(check)

    }

    useEffect(() => {
        getCheck().then(r => {})
    }, []);

    return (
        !checkAuth ? <></> : <>
            <div className="preloader flex-column justify-content-center align-items-center">
                <img className="animation__wobble" src={logo} alt="AISLogo" height="60"
                     width="60"/>
            </div>

            <nav className="main-header navbar navbar-expand navbar-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                            className="fas fa-bars"/></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="/panel" className="nav-link">Главная</Link>
                    </li>
                    {
                        [...parseData().roles].includes("Охранник") ? (
                            <li className="nav-item d-none d-sm-inline-block">
                                <Link target={"_blank"} to="/panel/scanner" className="nav-link">Сканер</Link>
                            </li>
                        ) : ""
                    }

                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="/exit" className="nav-link">Выход</Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                            <i className="fas fa-search"/>
                        </a>
                        <div className="navbar-search-block">
                            <form className="form-inline">
                                <div className="input-group input-group-sm">
                                    <input className="form-control form-control-navbar" type="search"
                                           placeholder="Search"
                                           aria-label="Search"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-navbar" type="submit">
                                            <i className="fas fa-search"/>
                                        </button>
                                        <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                            <i className="fas fa-times"/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>


                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                            <i className="fas fa-expand-arrows-alt"/>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
};

export default AdminNavbar;
