import React, {useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";
import CheckAuthPage from "../../Functions/CheckAAuthPage";
import {getData} from "../../Functions/GetData";
import QrScanner from "qr-scanner"

import errorImage from "./../../Shared/Images/error.gif"
import successImage from "./../../Shared/Images/success.gif"
import loaderImage from "./../../Shared/Images/loader.gif"

import yesSound from "./../../Shared/Audio/yes.mp3"
import noSound from "./../../Shared/Audio/no.mp3"
import axios from "axios";
import {parseData} from "../../Functions/ParseData";

const AdminScanner = () => {

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

    const [title, setTitle] = useState("Наведите ваш QR код на камеру")
    const [forbiddenFunction, setForbiddenFunction] = useState(true)
    async function authLink(link: string){
        setForbiddenFunction(false)

        if(link.includes(process.env.REACT_APP_API_SERVER + "")){
            if(link.includes("service-api/employee-verify")){
                if(link.includes(process.env.REACT_APP_API_SERVER + "service-api/employee-verify")){

                    validQRCode(false, true)

                    await axios.post(link, {}, {
                        headers: {
                            "user-token": parseData().auth
                        }
                    }).then(res => {
                        successAudio()
                        closeLoader()
                        validQRCode(true, false)
                        setTitle("Вы успешно авторизованы")
                        setTimeout(() => {
                            setTitle("Наведите ваш QR код на камеру")
                        }, 3000)
                    }).catch(err => {
                        errorAudio()
                        closeLoader()
                        validQRCode(false)
                        setTitle("Пользователь не найден")
                        setTimeout(() => {
                            setTitle("Наведите ваш QR код на камеру")
                        }, 3000)
                    })

                    return
                }
            }
        }

        errorAudio()

        validQRCode(false)
        setTitle("Неверный QR код")

        setTimeout(() => {
            setTitle("Наведите ваш QR код на камеру")
            setForbiddenFunction(true)
        }, 3000)

        return
    }

    function successAudio(){
        let audio = document.createElement("audio")
        audio.src = yesSound
        audio.play().then(r => {})
    }

    function errorAudio(){
        let audio = document.createElement("audio")
        audio.src = noSound
        audio.play().then(r => {})
    }

    function removeUIElements(){
        let footer: any = document.querySelector(".main-footer")
        let header: any = document.querySelector(".main-header")
        let sidebar: any = document.querySelector(".main-sidebar")
        if(footer){
            footer.style.display = "none !important"
            footer.classList.add("hidden__element")
        }
        if(header){
            header.style.display = "none !important"
            header.classList.add("hidden__element")
        }
        if(sidebar){
            sidebar.style.display = "none !important"
            sidebar.classList.add("hidden__element")
        }
        document.body.style.overflow = "hidden"
    }

    function validQRCode(valid: boolean = false, loader: boolean = false){
        let scanner: any = document.querySelector(".scanner__box")
        if(!loader){
            if(valid){
                scanner.classList.add("success")
                scanner.style.background = "url('" + successImage + "') no-repeat center"
                scanner.style.backgroundSize = "cover"
            } else {
                scanner.classList.add("error")
                scanner.style.background = "url('" + errorImage + "') no-repeat center"
                scanner.style.backgroundSize = "cover"
            }

            setTimeout(() => {
                scanner.classList.remove("error")
                scanner.style.background = "none"
            }, 3000)

            setTimeout(() => {
                scanner.classList.remove("success")
                scanner.style.background = "none"
            }, 1500)
        } else {
            scanner.classList.add("loading")
            scanner.style.background = "url('" + loaderImage + "') no-repeat center"
            scanner.style.backgroundSize = "cover"
        }
    }

    function closeLoader(){
        let scanner: any = document.querySelector(".scanner__box")
        scanner.classList.remove("loading")
        scanner.style.background = "none"
    }

    CheckAuthPage(checkAuth)

    useEffect(() => {
        getCheck().then(r => {})
        getDataPage().then(r => {})

        let timerDelete = setInterval(() => {
            removeUIElements()
        }, 200)

        setTimeout(() => {
            clearInterval(timerDelete)
        }, 5000)

        let htmlVideoScanner: any = document.querySelector(".video_scanner")

        const qrScanner: any = new QrScanner(
            htmlVideoScanner,
            (qrLink: any) => forbiddenFunction ? authLink(qrLink.data) : "",
            {
                highlightScanRegion: true,
                maxScansPerSecond: 0.3,
            }
        )

        qrScanner.start()
    }, []);

    return (
        <div className="content-wrapper">
            <section className="content content__position">
                <div className="container-fluid">
                    <div className="row d-flex flex-column align-center">
                        <h4 className={"mb-4"}>{title}</h4>
                        <div className="scanner__box">
                            <video height={"750"} className={"video_scanner"}  />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminScanner;
