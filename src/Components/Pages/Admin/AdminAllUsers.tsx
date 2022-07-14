import React, {useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";
import CheckAuthPage from "../../Functions/CheckAAuthPage";
import {getData} from "../../Functions/GetData";
import axios from "axios";
import {parseData} from "../../Functions/ParseData";
import {Link} from "react-router-dom";

const AdminAllUsers = () => {

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

    const [users, setUsers]: any = useState()
    async function getUsers(){
        await axios.get(process.env.REACT_APP_API_SERVER + "service-api/all-users", {
            headers: {
                "user-token": parseData().auth
            }
        }).then(res => {
            if(res && res.data && res.data.data_response){
                setUsers(res.data.data_response)
                console.log(res.data.data_response)
            }
        })
    }

    const [messageClear, setMessageClear]: any = useState()
    async function removeAllCash(){
        setMessageClear(
            <div className="alert alert-success alert-dismissible filter__input fade show mb-3" role="alert">
                Кэш успешно очищен!
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
            </div>
        )

        await axios.post(process.env.REACT_APP_API_SERVER + "service-api/delete-hash-users", {}, {
            headers: {
                "user-token": parseData().auth
            }
        })

        setTimeout(() => {
            setMessageClear("")
        }, 3000)
    }

    CheckAuthPage(checkAuth)

    useEffect(() => {
        getCheck().then(r => {})
        getDataPage().then(r => {})
        getUsers().then(r => {})
    }, []);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col-sm-12">
                            <h1 className="m-0">Все пользователи</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    {
                        messageClear
                    }
                    <button className="btn btn-danger mb-3" onClick={() => removeAllCash()}>Удалить кэш всех пользователей</button>
                    <div className="row">
                        {
                            users ? (
                                <>
                                    {
                                        users && users.map((user: any, i: number) => (
                                            <div className="col-md-3" key={i}>
                                                <div className="card card-outline card-primary">
                                                    <div className="card-header">
                                                        <h3 className="card-title">
                                                            {user.surname + " " + user.name}
                                                        </h3>

                                                        <div className="card-tools">
                                                            <button
                                                                type="button"
                                                                className="btn btn-tool"
                                                                data-card-widget="collapse"
                                                            ><i className="fas fa-minus" /></button>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <p><b>Логин: </b>{user.login}</p>
                                                        <p>{user.surname + " " + user.name + " " + user.patronymic}</p>
                                                        <pre>
                                                            <b>Должности:</b> {"\n"}
                                                            {user.posts.join("\n")}
                                                        </pre>
                                                        <Link
                                                            target={"_blank"}
                                                            to={"/panel/users/" + user.id}
                                                            className="btn btn-primary"
                                                        >Подробнее</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
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

export default AdminAllUsers;
