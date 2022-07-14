import React, {useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";
import CheckAuthPage from "../../Functions/CheckAAuthPage";
import {getData} from "../../Functions/GetData";
import axios from "axios";
import {parseData} from "../../Functions/ParseData";

const AdminViewPageActiveData = () => {

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

    const [dataTime, setDataTime]: any = useState()
    async function getTimeData(){
        await axios.get(process.env.REACT_APP_API_SERVER + "service-api/view-date", {
            headers: {
                "user-token": parseData().auth
            }
        }).then(res => {
            if(res && res.data && res.data.data_response){
                setDataTime(res.data.data_response)
            }
        })
    }

    CheckAuthPage(checkAuth)

    useEffect(() => {
        getCheck().then(r => {})
        getDataPage().then(r => {})
        getTimeData().then(r => {})
    }, []);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col-sm-12">
                            <h1 className="m-0">
                                Данные активной смены  {String(new Date().getDate()).length === 1 ? "0" + new Date().getDate() : new Date().getDate()}.
                                {String(new Date().getMonth()).length === 1 ? "0" + Number(new Date().getMonth() + 1) : Number(new Date().getMonth() + 1)}.
                                {new Date().getFullYear()}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        {
                            dataTime ? (
                                <>
                                    {
                                        dataTime.length !== 0 ? (
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
                                                    dataTime && dataTime.map((user: any, key: any) => {
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

export default AdminViewPageActiveData;
