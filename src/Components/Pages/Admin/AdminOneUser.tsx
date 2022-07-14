import React, {useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";
import CheckAuthPage from "../../Functions/CheckAAuthPage";
import {getData} from "../../Functions/GetData";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {parseData} from "../../Functions/ParseData";

const AdminOneUser = () => {

    // loader check
    const [checkAuth, setCheckAuth] = useState(true)
    async function getCheck() {
        let check = await CheckAuth()
        setCheckAuth(check)
    }

    // get data
    const [dataUser, setDataUser] = useState()
    async function getDataPage(){
        let data = await getData()
        setDataUser(data)
    }

    const {id} = useParams()

    const [user, setUser]: any = useState()
    async function getUser(){
        await axios.get(process.env.REACT_APP_API_SERVER + "service-api/all-users/" + id, {
            headers: {
                "user-token": parseData().auth
            }
        }).then(res => {
            if(res && res.data && res.data.data_response){
                setUser(res.data.data_response)
            }
        }).catch((e => {
            if(e && e.response && e.response.data && e.response.data.code === 404){
                setUser(e.response.data.code)
            }
        }))
    }

    CheckAuthPage(checkAuth)

    useEffect(() => {
        getCheck().then(r => {})
        getDataPage().then(r => {})
        getUser().then(r => {})
    }, []);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col-sm-12">
                            <h1 className="m-0">Пользователь {user === 404 ? "не найден" : ""}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">

                    {
                        user ? (
                            <>
                                {
                                    user === 404 ? (
                                        <>
                                            <p>Запрашиваемый пользователь не найден на сервере</p>
                                            <Link className="btn btn-primary d-inline" to={"/panel/users"}>Вернуться</Link>
                                        </>
                                    ) : (
                                        <>
                                            <div className={"row"}>
                                                {
                                                    user.avatar ? (
                                                        <img className={"images_responsive"} src={process.env.REACT_APP_API_SERVER + "avatars/" + user.avatar} alt=""/>
                                                    ) : <h4>Загруженная фотография отсутсвует</h4>
                                                }
                                                <h3>Данные пользователя {user.login}</h3>
                                                <p>{
                                                    user.surname + " " +
                                                    user.name + " " +
                                                    user.patronymic
                                                }</p>
                                                <p>Дата рождения: {user.birthday.split("-").reverse().join(".")}</p>
                                                <p>Работает на корпусах: <br /> {user.enclosures.join(" / ")}</p>
                                                <p>Должности: <br /> {user.posts.join(" / ")}</p>
                                                <p>Уровни доступа: <br /> {user.roles.join(" / ")}</p>
                                                <h3>QR токен доступа:</h3>
                                                <img className={"images_responsive mb-3"} src={user.qr_image} alt=""/>
                                            </div>
                                            <button className="btn btn-danger d-inline">Удалить пользователя</button>
                                            <button
                                                className="btn btn-warning d-inline margin-left-10 text-white"
                                            >Редактировать пользователя</button>
                                        </>
                                    )
                                }
                            </>
                        ) : (
                            <div className="spinner-border m-5 mb-3" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </div>
                        )
                    }
                </div>
            </section>
        </div>
    );
};

export default AdminOneUser;
