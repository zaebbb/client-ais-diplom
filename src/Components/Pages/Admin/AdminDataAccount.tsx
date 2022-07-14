import React, {useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";
import CheckAuthPage from "../../Functions/CheckAAuthPage";
import {getData} from "../../Functions/GetData";
import axios from "axios";
import {parseData} from "../../Functions/ParseData";
import {saveData} from "../../Functions/SaveData";
import {v4 as uuid} from "uuid"
import QRcode from "qrcode"

const AdminDataAccount = () => {

    const [layoutClearHash, setLayoutClearHash]: any = useState()

    // loader check
    const [checkAuth, setCheckAuth] = useState(true)
    async function getCheck() {
        let check = await CheckAuth()
        setCheckAuth(check)
    }

    // get data
    const [dataUser, setDataUser]: any = useState()
    async function getDataPage(){
        let data = await getData()
        if(data && data.data.data_response){
            setDataUser(data.data.data_response)

            // console.log(data.data.data_response)
        }

    }

    async function updateQrHash(){
        let tokenFirst = uuid();
        let tokenLast = uuid() + tokenFirst;
        // console.log(tokenLast)
        // console.log(tokenLast.length)

        let qrcode = await QRcode.toDataURL(process.env.REACT_APP_API_SERVER + "service-api/employee-verify/" + tokenLast ).then(url => {
            // console.log(url)

            axios.post(process.env.REACT_APP_API_SERVER + "service-api/update-qr-hash", {
                hash_qr: tokenLast,
                image_hash_qr: url
            }, {
                headers: {
                    "user-token": parseData().auth
                }
            }).then(res => {
                // console.log(res)
            })

            setLayoutClearHash(
                <div className="alert alert-warning alert-dismissible fade show mt-3" role="alert">
                    Хэш токена успешно обновлен!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                </div>
            )

            setTimeout(() => {
                setLayoutClearHash("")
            }, 5000)
        })
    }

    async function clearHash(){
        setLayoutClearHash(
            <div className="alert alert-success alert-dismissible filter__input fade show mb-4" role="alert">
              Кэш успешно очищен!
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
            </div>
        )

        await axios.post(process.env.REACT_APP_API_SERVER + "service-api/delete-hash", "", {
            headers: {
                "user-token": parseData().auth,
            }
        })

        setTimeout(() => {
            setLayoutClearHash("")
        }, 5000)
    }

    CheckAuthPage(checkAuth)

    useEffect(() => {
        getCheck().then(r => {})
        getDataPage().then(r => {})
    }, []);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col-sm-12">
                            <h1 className="m-0">Данные аккаунта</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <button onClick={() => {saveData("save-data").then(r => {})}} type="button" className="btn btn-primary mb-4">Сохранить данные</button>
                    <button onClick={() => {clearHash().then(r => {})}} type="button" className="btn btn-danger margin-left-20 toastsDefaultDefault mb-4">Очистить кэш файлы</button>
                    <button onClick={() => {updateQrHash().then(r => {})}} type="button" className="btn btn-warning margin-left-20 mb-4">Обновить хэш токен</button>
                    {layoutClearHash}
                    <div className="row">
                        {
                            dataUser && dataUser.login ? (
                                <>
                                    {
                                        dataUser.avatar ? (
                                            <img className={"images_responsive"} src={process.env.REACT_APP_API_SERVER + "avatars/" + dataUser.avatar} alt=""/>
                                        ) : <h4>Загруженная фотография отсутсвует</h4>
                                    }
                                    <h3>Данные пользователя {dataUser.login}</h3>
                                    <p>{
                                        dataUser.surname + " " +
                                        dataUser.name + " " +
                                        dataUser.patronymic
                                    }</p>
                                    <p>Дата рождения: {dataUser.birthday.split("-").reverse().join(".")}</p>
                                    <p>Работает на корпусах: <br /> {dataUser.enclosures.join(" / ")}</p>
                                    <p>Должности: <br /> {dataUser.posts.join(" / ")}</p>
                                    <p>Уровни доступа: <br /> {dataUser.roles.join(" / ")}</p>
                                    <h3>QR токен доступа:</h3>
                                    <img className={"images_responsive mb-3"} src={dataUser.qr_hash} alt=""/>
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

export default AdminDataAccount;
