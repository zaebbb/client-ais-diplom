import React, {useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";
import CheckAuthPage from "../../Functions/CheckAAuthPage";
import {getData} from "../../Functions/GetData";
import axios from "axios";
import {parseData} from "../../Functions/ParseData";

const AdminLogs = () => {

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

    const [logs, setLogs]: any = useState()
    async function getLog(){
        await axios.get(process.env.REACT_APP_API_SERVER + "service-api/save-log", {
            headers: {
                "user-token": parseData().auth
            }
        }).then(res => {
            if(res && res.data && res.data.data_response){
                setLogs(res.data.data_response.files)
            }
        })
    }

    CheckAuthPage(checkAuth)

    useEffect(() => {
        getCheck().then(r => {})
        getDataPage().then(r => {})
        getLog().then(r => {})
    }, []);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col-sm-12">
                            <h1 className="m-0">Логи сервера</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    {
                        logs ? (
                            <>
                                {
                                    logs && logs.map((log: any, key: number) => (
                                        <a
                                            className={"btn btn-primary margin-left-10 mb-2"}
                                            href={process.env.REACT_APP_API_SERVER + "logs/" + log}
                                            target={"_blank"}
                                            download={"download"}
                                            key={key}
                                        >{log}</a>
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
            </section>
        </div>
    );
};

export default AdminLogs;
