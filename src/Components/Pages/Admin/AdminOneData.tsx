import React, {useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";
import CheckAuthPage from "../../Functions/CheckAAuthPage";
import {getData} from "../../Functions/GetData";
import axios from "axios";
import {parseData} from "../../Functions/ParseData";
import {Link, useParams} from "react-router-dom";
import {saveData} from "../../Functions/SaveData";

const AdminOneData = () => {

    // loader check
    const [checkAuth, setCheckAuth] = useState(true)
    async function getCheck() {
        let check = await CheckAuth()
        setCheckAuth(check)
    }

    const {date}: any = useParams()
    console.log(date)

    // get data
    const [dataUser, setDataUser] = useState()
    async function getDataPage(){
        let data = await getData()
        setDataUser(data)
    }

    const [dateState, setDateState]: any = useState()
    async function getDatas(){
        await axios.get(process.env.REACT_APP_API_SERVER + "service-api/view-dates/" + date.split(".").join("_"), {
            headers: {
                "user-token": parseData().auth
            }
        }).then(res => {
            if(res && res.data && res.data.data_response){
                setDateState(res.data.data_response[0].data)
            }
        })
    }

    CheckAuthPage(checkAuth)

    useEffect(() => {
        getCheck().then(r => {})
        getDataPage().then(r => {})
        getDatas().then(r => {})
    }, []);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col-sm-12">
                            <h1 className="m-0">Дата {date}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <button
                        className="btn btn-primary mb-2"
                        onClick={() => {saveData("view-dates/" + date.split(".").join("_") + "/save-to-word").then(r => {})}}
                    >
                        <i className="fa fa-file-word nav-icon mr-1" /> WORD
                    </button>

                    <button
                        className="btn btn-danger mb-2 ml-1"
                        onClick={() => {saveData("view-dates/" + date.split(".").join("_") + "/save-to-pdf").then(r => {})}}
                    >
                        <i className="fa fa-file-pdf nav-icon mr-1" /> PDF
                    </button>

                    <button
                        className="btn btn-success mb-2 ml-1"
                        onClick={() => {saveData("view-dates/" + date.split(".").join("_") + "/save-to-excel").then(r => {})}}
                    >
                        <i className="fa fa-file-excel nav-icon icon__edit mr-1" /> EXCEL
                    </button>

                    <button
                        className="btn btn-danger mb-2 ml-1"
                        onClick={() => {saveData("view-dates/" + date.split(".").join("_") + "/save-to-html").then(r => {})}}
                    >
                        <i className="fab fa-html5 nav-icon icon__edit mr-1" /> HTML
                    </button>
                    <div className="row">
                        {
                            dateState ? (
                                <>
                                    {
                                        dateState.length !== 0 ? (
                                            <table className="table ">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Логин</th>
                                                    <th scope="col">Имя</th>
                                                    <th scope="col">Фамилия</th>
                                                    <th scope="col">Отчество</th>
                                                    <th scope="col">Уровни доступа</th>
                                                    <th scope="col">Корпуса</th>
                                                    <th scope="col">Должности</th>
                                                    <th scope="col">Время</th>
                                                    <th scope="col">Рабочее время</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    dateState && dateState.map((user: any, key: any) => {
                                                        return (
                                                            <tr className={"table__info"} key={key}>
                                                                <td>{user.login}</td>
                                                                <td>{user.name}</td>
                                                                <td>{user.surname}</td>
                                                                <td>{user.patronymic}</td>
                                                                <td><pre>{user.roles.join("\n")}</pre></td>
                                                                <td><pre>{user.enclosures.join("\n")}</pre></td>
                                                                <td><pre>{user.posts.join("\n")}</pre></td>
                                                                <td><pre>{user.time.join("\n")}</pre></td>
                                                                <td><pre>{user.work_time.split(";").join("\n")}</pre></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        ) : (
                                            <h5>Данных пользователей не обнаружены</h5>
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
                </div>
            </section>
        </div>
    );
};

export default AdminOneData;
