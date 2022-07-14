import React, {useEffect, useState} from 'react';
import logo from "./../../Shared/Images/logo.png"
import {Link} from "react-router-dom";
import {CheckAuth} from "../../Functions/CheckAuth";
import {getData} from "../../Functions/GetData";
import {parseData} from "../../Functions/ParseData";
import {saveData} from "../../Functions/SaveData";
import userImage from "./../../Shared/Images/user.png"
import axios from "axios";

const Sidebar = () => {

    // loader check
    const [checkAuth, setCheckAuth] = useState(true)
    async function getCheck(){
        let check = await CheckAuth()
        setCheckAuth(check)
    }

    // get data
    const [dataUser, setDataUser]: any = useState()
    async function getDataPage(){
        let data: any = await getData()
        setDataUser(data)
    }

    async function check_data(){
        if(parseData().roles.includes("Охранник")){
            await axios.get(process.env.REACT_APP_API_SERVER + "service-api/check-date", {
                headers: {
                    "user-token": parseData().auth
                }
            })
        }
    }

    useEffect(() => {
        getCheck().then(r => {})
        getDataPage().then(r => {})
        check_data().then(r => {})
    }, [])

    return (
        !checkAuth ? <></> : <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/panel" className="brand-link">
                <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />

                <span className="brand-text font-weight-light">Учет Сотрудников</span>
            </Link>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    {
                        dataUser && dataUser.data && dataUser.data.data_response ? (
                            <>
                                <div className="image">
                                    {
                                        dataUser && dataUser.data && dataUser.data.data_response ? (
                                            <img src={dataUser.data.data_response.avatar ? process.env.REACT_APP_API_SERVER + "avatars/" + dataUser.data.data_response.avatar : userImage} className="img-circle elevation-2" alt="User Image"/>
                                        ) : ""
                                    }

                                </div>
                                <div className="info">
                                    <span className="d-block">
                                        {
                                            dataUser && dataUser.data && dataUser.data.data_response ? dataUser.data.data_response.login.split("") : ""
                                        }
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="spinner-border m-1 mb-1" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </div>
                        )
                    }
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        <li className="nav-item menu-open">
                            <span className="nav-link active">
                                <i className="nav-icon fas fa-home"/>
                                <p>
                                    Главная
                                    <i className="right fas fa-angle-left"/>
                                </p>
                            </span>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/panel/user/update" className="nav-link">
                                        <i className="fa fa-pen nav-icon"/>
                                        <p>Обновить аккаунт</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/panel/user/account" className="nav-link">
                                        <i className="fa fa-database nav-icon"/>
                                        <p>Даннные аккаунта</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* SECURITY USER */}
                        {
                            parseData().roles.includes("Охранник") ? (
                                <>
                                    <li className="nav-header">Активная смена</li>
                                    <li className="nav-item">
                                        <Link to="/panel/active/view" className="nav-link">
                                            <i className="nav-icon fas fa-eye"></i>
                                            <p>
                                                Просмотреть
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link">
                                            <i className="nav-icon fas fa-download"/>
                                            <p>
                                                Сохранить
                                                <i className="right fas fa-angle-left"/>
                                            </p>
                                        </span>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <Link
                                                    to="#"
                                                    className="nav-link"
                                                    onClick={() => {saveData("view-date/save-to-html").then(r => {})}}
                                                >
                                                    <i className="fab fa-html5 nav-icon"/>
                                                    <p>HTML</p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="#"
                                                    className="nav-link"
                                                    onClick={() => {saveData("view-date/save-to-pdf").then(r => {})}}
                                                >
                                                    <i className="fa fa-file-pdf nav-icon"/>
                                                    <p>PDF</p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="#"
                                                    className="nav-link"
                                                    onClick={() => {saveData("view-date/save-to-word").then(r => {})}}
                                                >
                                                    <i className="fa fa-file-word nav-icon"/>
                                                    <p>WORD</p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="#"
                                                    className="nav-link"
                                                    onClick={() => {saveData("view-date/save-to-excel").then(r => {})}}
                                                >
                                                    <i className="fa fa-file-excel nav-icon"/>
                                                    <p>EXCEL</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            ) : ""
                        }

                        {/* ADMIN USER */}
                        {
                            parseData().roles.includes("Администратор") ? (
                                <>
                                    <li className="nav-header">Все смены</li>
                                    <li className="nav-item">
                                        <span className="nav-link">
                                            <i className="nav-icon fas fa-download"/>
                                            <p>
                                                Сохранить
                                                <i className="right fas fa-angle-left"/>
                                            </p>
                                        </span>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <Link
                                                    to="#"
                                                    className="nav-link"
                                                    onClick={() => {saveData("view-dates/save-all-to-html").then(r => {})}}
                                                >
                                                    <i className="fab fa-html5 nav-icon"/>
                                                    <p>HTML</p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="#"
                                                    className="nav-link"
                                                    onClick={() => {saveData("view-dates/save-all-to-pdf").then(r => {})}}
                                                >
                                                    <i className="fa fa-file-pdf nav-icon"/>
                                                    <p>PDF</p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="#"
                                                    className="nav-link"
                                                    onClick={() => {saveData("view-dates/save-all-to-word").then(r => {})}}
                                                >
                                                    <i className="fa fa-file-word nav-icon"/>
                                                    <p>WORD</p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="#"
                                                    className="nav-link"
                                                    onClick={() => {saveData("view-dates/save-all-to-excel").then(r => {})}}
                                                >
                                                    <i className="fa fa-file-excel nav-icon"/>
                                                    <p>EXCEL</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>




                                    <li className="nav-header">Фильтрация</li>
                                    <li className="nav-item">
                                        <span className="nav-link">
                                            <i className="nav-icon fas fa-filter"/>
                                            <p>
                                                Фильтровать
                                                <i className="right fas fa-angle-left"/>
                                            </p>
                                        </span>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <Link
                                                    to="/panel/filter/month"
                                                    className="nav-link"
                                                >
                                                    <i className="fa fa-calendar nav-icon"/>
                                                    <p>По месяцу</p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/panel/filter/year"
                                                    className="nav-link"
                                                >
                                                    <i className="fa fa-calendar nav-icon"/>
                                                    <p>По году</p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/panel/filter/date"
                                                    className="nav-link"
                                                >
                                                    <i className="fa fa-calendar nav-icon"/>
                                                    <p>По дате</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>





                                    <li className="nav-header">Добавление</li>
                                    <li className="nav-item">
                                        <span className="nav-link">
                                            <i className="nav-icon fas fa-plus"/>
                                            <p>
                                                Добавить
                                                <i className="right fas fa-angle-left"/>
                                            </p>
                                        </span>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a
                                                    href="/panel/add/user"
                                                    className="nav-link"
                                                >
                                                    <i className="fas fa-user nav-icon"/>
                                                    <p>Пользователя</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/panel/add/corpus"
                                                    className="nav-link"
                                                >
                                                    <i className="fas fa-building nav-icon"/>
                                                    <p>Корпус</p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/panel/add/post"
                                                    className="nav-link"
                                                >
                                                    <i className="fas fa-wrench nav-icon"/>
                                                    <p>Должность</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>




                                    <li className="nav-header">Другое</li>
                                    <li className="nav-item">
                                        <Link to="/panel/users" className="nav-link">
                                            <i className="fa fa-users nav-icon"/>
                                            <p>Пользователи</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/panel/works" className="nav-link">
                                            <i className="fa fa-briefcase nav-icon"/>
                                            <p>Смены</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/panel/logs" className="nav-link">
                                            <i className="fa fa-server nav-icon"/>
                                            <p>Логи сервера</p>
                                        </Link>
                                    </li>
                                </>
                            ) : ""
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
