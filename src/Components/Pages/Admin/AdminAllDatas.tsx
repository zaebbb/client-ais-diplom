import React, {useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";
import CheckAuthPage from "../../Functions/CheckAAuthPage";
import {getData} from "../../Functions/GetData";
import axios from "axios";
import {parseData} from "../../Functions/ParseData";
import {Link} from "react-router-dom";
import {saveData} from "../../Functions/SaveData";

const AdminAllDatas = () => {

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

    const [datas, setDatas]: any = useState()
    async function getDatas(){
        await axios.get(process.env.REACT_APP_API_SERVER + "service-api/view-dates", {
            headers: {
                "user-token": parseData().auth
            }
        }).then(res => {
            if(res && res.data && res.data.data_response){
                setDatas(res.data.data_response)
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
                            <h1 className="m-0">Все даты</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        {
                            datas ? (
                                <>
                                    {
                                        datas && datas.map((data: any, i: number) => (
                                            <div className="col-md-3" key={i}>
                                                <div className="card card-outline card-primary collapsed-card">
                                                    <div className="card-header">
                                                        <h3 className="card-title">
                                                            {data.date}
                                                        </h3>

                                                        <div className="card-tools">
                                                            <button
                                                                type="button"
                                                                className="btn btn-tool"
                                                                data-card-widget="collapse"
                                                            ><i className="fas fa-plus" /></button>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">

                                                        <Link
                                                            target={"_blank"}
                                                            to={"/panel/works/" + data.date}
                                                            className="btn btn-primary d-block mb-3"
                                                        >Подробнее</Link>

                                                        <p><strong>Быстрое сохранение</strong></p>
                                                        <button
                                                            className="btn btn-sm btn-primary mb-2 d-block w-100"
                                                            onClick={() => {saveData("view-dates/" + data.date.split(".").join("_") + "/save-to-word").then(r => {})}}
                                                        >
                                                            <i className="fa fa-file-word nav-icon mr-1" /> WORD
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-danger mb-2 d-block w-100"
                                                            onClick={() => {saveData("view-dates/" + data.date.split(".").join("_") + "/save-to-pdf").then(r => {})}}
                                                        >
                                                            <i className="fa fa-file-pdf nav-icon mr-1" /> PDF
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-success mb-2 d-block w-100"
                                                            onClick={() => {saveData("view-dates/" + data.date.split(".").join("_") + "/save-to-excel").then(r => {})}}
                                                        >
                                                            <i className="fa fa-file-excel nav-icon icon__edit mr-1" /> EXCEL
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-danger d-block w-100"
                                                            onClick={() => {saveData("view-dates/" + data.date.split(".").join("_") + "/save-to-html").then(r => {})}}
                                                        >
                                                            <i className="fab fa-html5 nav-icon icon__edit mr-1" /> HTML
                                                        </button>
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

export default AdminAllDatas;
