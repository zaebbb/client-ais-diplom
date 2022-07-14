import React, {useState} from 'react';
import captcha from "./../../Functions/Captcha"
import {AuthUser, GetSaveData} from "../../Functions/AuthUser";

const Mainmodal = () => {

    type captcha = {
        firstNumber: number,
        lastNumber: number,
        operation: string,
        result: number
    }

    const [errors, setError]: [string[], any] = useState([])
    const [captchaObj, setCaptcha]: [captcha, any] = useState(captcha())

    const saveData = GetSaveData()

    function validation(e: any){
        e.preventDefault()

        const errors: string[] = []
        setError([])

        const captchaValue: any = document.querySelector(".form-captcha")
        const loginValue: any = document.querySelector(".form-login")
        const passwordValue: any = document.querySelector(".form-password")
        const checkboxSuccessValue: any = document.querySelector(".form-success")
        const checkboxSaveValue: any = document.querySelector(".form-save")

        // validation login and password
        if(!loginValue || loginValue.value.trim() === ""){ errors.push("Поле логина обязательно для заполнения") }
        if(!passwordValue || passwordValue.value.trim() === ""){ errors.push("Поле пароля обязательно для заполнения") }

        // validation captcha
        if(Number(captchaValue.value) !== captchaObj.result){
            errors.push("Вы не прошли проверку на робота")
            setCaptcha(captcha())
        }

        // validation success use data
        if(!checkboxSuccessValue.checked){ errors.push("Не выбрано принятие условий использования данными") }

        setError(errors)

        if(errors.length === 0){
            const authObj = {
                login: loginValue.value,
                password: passwordValue.value
            }

            // AuthUser(".authForm", authObj, checkboxSaveValue.checked)
            AuthUser(".authForm", authObj, checkboxSaveValue.checked).then(res => {
                if(!res){
                    setError(["Неверное имя пользователя или пароль"])
                }
            })

            // alert("Форма отправлена")
        }
    }

    return (
        <form className="modal fade authForm" id="authModal" aria-hidden="true" onSubmit={validation}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Авторизация</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">

                        {/* validation */}
                        {
                            errors && errors.map((el, key) => {
                                return (
                                    <div
                                        className="alert alert-danger alert-dismissible fade show"
                                        role="alert"
                                        key={key}
                                    >
                                        {el}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert"
                                                aria-label="Close" />
                                    </div>
                                )
                            })
                        }

                        {/* inputs */}
                        {/* login */}
                        <div className="mb-3">
                            <label className="form-label">Ваш логин</label>
                            <input
                                type="text"
                                className="form-control form-login"
                                defaultValue={saveData ? saveData.login : ""}
                            />
                        </div>

                        {/* password */}
                        <div className="mb-3">
                            <label className="form-label">Ваш пароль</label>
                            <input
                                type="password"
                                className="form-control form-password"
                                defaultValue={saveData ? saveData.password : ""}
                            />
                        </div>

                        {/* captcha */}
                        <div className="mb-3">
                            <label className="form-label">
                                Сколько будет {`${captchaObj.firstNumber} ${captchaObj.operation} ${captchaObj.lastNumber}`}
                            </label>
                            <input type="number" className="form-control form-captcha"  />
                        </div>

                        {/* success data */}
                        <div className="form-check form-switch mb-3 margin-left-20">
                            <input className="form-check-input form-success" defaultChecked={!!saveData} type="checkbox" id="success_data" />
                            <label className="form-check-label" htmlFor="success_data">Принять <a href={"/private-policy"}>условия использования данных</a></label>
                        </div>

                        {/* save data */}
                        <div className="form-check form-switch mb-3 margin-left-20">
                            <input className="form-check-input form-save" type="checkbox" id="save_data" />
                            <label className="form-check-label" htmlFor="save_data">Сохранить данные</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        <button type="submit" className="btn btn-info">Авторизоваться</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Mainmodal;

