import React, {useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";
import CheckAuthPage from "../../Functions/CheckAAuthPage";
import {getData} from "../../Functions/GetData";
import {log} from "util";
import {Link} from "react-router-dom";
import {saveData} from "../../Functions/SaveData";

const AdminFilterMonth = () => {

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

    const [inputData, setInputData]: any = useState()
    const [validationData, setValidationData]: any = useState()

    CheckAuthPage(checkAuth)

    useEffect(() => {
        getCheck().then(r => {})
        getDataPage().then(r => {})
    }, []);

    function validation(){
        setValidationData("")

        if(!inputData){
            setValidationData(
                <div className="alert alert-danger filter__input" role="alert">
                  Поле заполнения месяца обязательно для заполнения
                </div>
            )

            return false
        }

        return true
    }

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col-sm-12">
                            <h1 className="m-0">Фильтр по месяцу {new Date().getFullYear() + " года"}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    {
                        validationData
                    }
                    <input
                        type="number"
                        onInput={(e: any) => setInputData(e.target.value)}
                        placeholder={"Введите месяц " + new Date().getFullYear() + " года"}
                        min={"1"}
                        max={"12"}
                        className="form-control filter__input"
                    />
                    <h3 className={"mt-4 mb-3"}>Сохранить в формате:</h3>
                    <button
                        onClick={() => {
                            if(validation()){
                                saveData("view-dates/month/" + inputData + "/save-to-word").then(r => {})
                            }
                        }}
                        className={"btn btn-primary "}
                    >
                        <i className="fa fa-file-word nav-icon icon__edit"/>
                        WORD
                    </button>
                    <button
                        onClick={() => {
                            if(validation()){
                                saveData("view-dates/month/" + inputData + "/save-to-pdf").then(r => {})
                            }
                        }}
                        className={"btn btn-danger margin-left-10"}
                    >
                        <i className="fa fa-file-pdf nav-icon icon__edit"/>
                        PDF
                    </button>
                    <button
                        onClick={() => {
                            if(validation()){
                                saveData("view-dates/month/" + inputData + "/save-to-excel").then(r => {})
                            }
                        }}
                        className={"btn btn-success margin-left-10"}
                    >
                        <i className="fa fa-file-excel nav-icon icon__edit"/>
                        EXCEL
                    </button>
                    <button
                        onClick={() => {
                            if(validation()){
                                saveData("view-dates/month/" + inputData + "/save-to-html").then(r => {})
                            }
                        }}
                        className={"btn btn-danger margin-left-10"}
                    >
                        <i className="fab fa-html5 nav-icon icon__edit"/>
                        HTML
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AdminFilterMonth;
