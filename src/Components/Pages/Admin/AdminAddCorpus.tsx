import React, {useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";
import CheckAuthPage from "../../Functions/CheckAAuthPage";
import {getData} from "../../Functions/GetData";
import axios from "axios";
import {parseData} from "../../Functions/ParseData";

const AdminAddCorpus = () => {

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

    const [addError, setAddError]: any = useState()
    const [inputCorpus, setInputCorpus] = useState("")
    const [enclosures, setEnclosures]: any = useState()
    async function getEnclosures(){
        await axios.get(process.env.REACT_APP_API_SERVER + "service-api/get-corpus", {
            headers: {
                "user-token": parseData().auth
            }
        }).then(res => {
            if(res && res.data && res.data.data_response){
                setEnclosures(res.data.data_response.map((el: any) => el.split("").map((elem: any) => elem.toLowerCase()).join("")))
            }
        })
    }

    async function addCorpus(){
        let inputValue = inputCorpus.trim().split("").map((elem: any) => elem.toLowerCase()).join("")
        setAddError("")

        if(inputValue === ""){
            setAddError(
                <div className="alert alert-danger filter__input" role="alert">
                  Поле корпуса обязательно для заполнения
                </div>
            )
        } else if(enclosures.includes(inputValue)){
            setAddError(
                <div className="alert alert-danger filter__input" role="alert">
                    Такой корпус уже существует в системе
                </div>
            )
        } else {
            await axios.post(process.env.REACT_APP_API_SERVER + "service-api/add-corpus", {
                corpus: inputCorpus.split("").map((el: any, i) => i === 0 ? el.toUpperCase() : el).join("")
            }, {
                headers: {
                    "user-token": parseData().auth
                }
            })

            setAddError(
                <div className="alert alert-success filter__input" role="alert">
                    Корпус успешно добавлен
                </div>
            )
        }

        setTimeout(() => {
            setAddError("")
        }, 3000)
    }

    CheckAuthPage(checkAuth)

    useEffect(() => {
        getCheck().then(r => {})
        getDataPage().then(r => {})
        getEnclosures().then(r => {})
    }, []);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col-sm-12">
                            <h1 className="m-0">Добавить корпус</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    {
                        enclosures ? (
                            <>
                                {
                                    addError
                                }
                                <input
                                    type="text"
                                    onInput={(e: any) => setInputCorpus(e.target.value)}
                                    placeholder={"Введите корпус"}
                                    className="form-control filter__input mb-3"
                                />
                                <button className="btn btn-primary" onClick={() => {addCorpus().then(r => {})}}>Добавить</button>
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

export default AdminAddCorpus;
