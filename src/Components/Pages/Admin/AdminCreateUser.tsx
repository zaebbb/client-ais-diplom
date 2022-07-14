import React, {FormEvent, useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";
import CheckAuthPage from "../../Functions/CheckAAuthPage";
import {getData} from "../../Functions/GetData";
import axios from "axios";
import {parseData} from "../../Functions/ParseData";
import {v4} from "uuid";
import QRcode from "qrcode";

const AdminCreateUser = () => {

    // info
    const [login, setLogin]: any = useState()
    const [password, setPassword]: any = useState()
    const [againPassword, setAgainPassword]: any = useState()
    const [name, setName]: any = useState()
    const [surname, setSurname]: any = useState()
    const [patronymic, setPatronymic]: any = useState()
    const [birthday, setBirthday]: any = useState()
    const [gender, setGender]: any = useState()
    const [corpus, setCorpus]: any = useState()
    const [rolesInput, serRolesInput]: any = useState()
    const [postsInput, serPostsInput]: any = useState()
    const [image, setImage]: any = useState()
    const [qrToken, setQRToken]: any = useState()
    const [hashQRImage, setHashQRImage]: any = useState()

    const [disabled, setDisabled] = useState(false)
    const [errors, setErrors] = useState([])

    const [result, setResult]: any = useState()


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

    const [posts, setPosts] = useState([])
    async function getPosts(){
        await axios.get(process.env.REACT_APP_API_SERVER + "service-api/get-posts", {
            headers: {
                "user-token": parseData().auth
            }
        }).then(res => {
            if(res && res.data && res.data.data_response){
                setPosts(res.data.data_response)
            }
        })
    }

    const [enclosures, setEnclosures] = useState([])
    async function getCorpuses(){
        await axios.get(process.env.REACT_APP_API_SERVER + "service-api/get-corpus", {
            headers: {
                "user-token": parseData().auth
            }
        }).then(res => {
            if(res && res.data && res.data.data_response){
                setEnclosures(res.data.data_response)
            }
        })
    }

    const [roles, setRoles] = useState([])
    async function getRoles(){
        await axios.get(process.env.REACT_APP_API_SERVER + "service-api/get-roles", {
            headers: {
                "user-token": parseData().auth
            }
        }).then(res => {
            if(res && res.data && res.data.data_response){
                setRoles(res.data.data_response)
            }
        })
    }

    async function validation(){

        setErrors([])

        let errorsValid: any = []

        if(!login || login.trim() === ""){ errorsValid.push('Поле "Логин" обязательно для заполнения!') }
        if(!password || password.trim() === ""){ errorsValid.push('Поле "Пароль" обязательно для заполнения!') }
        if(!againPassword || againPassword.trim() === ""){ errorsValid.push('Поле "Повторный пароль" обязательно для заполнения!') }
        if(password !== againPassword){ errorsValid.push('Пароли не совпадают') }

        if(!name || name.trim() === ""){ errorsValid.push('Поле "Имя" обязательно для заполнения!') }
        if(!surname || surname.trim() === ""){ errorsValid.push('Поле "Фамилия" обязательно для заполнения!') }
        if(!patronymic || patronymic.trim() === ""){ errorsValid.push('Поле "Отчество" обязательно для заполнения!') }
        if(!birthday || birthday.trim() === ""){ errorsValid.push('Поле "Дата рождения" обязательно для заполнения!') }
        if(!gender || gender.trim() === ""){ errorsValid.push('Поле "Пол" обязательно для заполнения!') }

        if(!corpus || corpus.trim() === ""){ errorsValid.push('Поле "Корпусы" обязательно для заполнения!') }
        if(!rolesInput || rolesInput.trim() === ""){ errorsValid.push('Поле "Роли" обязательно для заполнения!') }
        if(!postsInput || postsInput.trim() === ""){ errorsValid.push('Поле "Должности" обязательно для заполнения!') }

        if(rolesInput.includes("1") && !rolesInput.includes("3")){ errorsValid.push('Роль администратора обязательно должна включать уровень доступа пользователь') }
        if(rolesInput.includes("2") && !rolesInput.includes("3")){ errorsValid.push('Роль охранника обязательно должна включать уровень доступа пользователь') }

        if(!image){ errorsValid.push('Поле "Аватар пользователя" обязательно для заполнения!') }

        setErrors(errorsValid)

        if(errorsValid.length === 0){


            setTimeout(() => {
                createUser().then(r => {})
            }, 500)
        }
    }

    async function createUser(){
        let file: any = document.querySelector(".input__file")

        let formData = new FormData()
        formData.append("avatar", file.files[0])

        formData.append("login", login)
        formData.append("password", password)

        formData.append("qr_token", qrToken)
        formData.append("hash_image_qr", hashQRImage)

        formData.append("name", name)
        formData.append("surname", surname)
        formData.append("patronymic", patronymic)
        formData.append("birthday", birthday)
        formData.append("gender", gender)

        formData.append("roles", rolesInput)
        formData.append("posts", postsInput)
        formData.append("enclosures", corpus)

        await axios.post(process.env.REACT_APP_API_SERVER + "service-api/create-user",
        //     {
        //     login: login,
        //     password: password,
        //
        //     qr_token: qrToken,
        //     hash_image_qr: hashQRImage,
        //
        //     name: name,
        //     surname: surname,
        //     patronymic: patronymic,
        //     birthday: birthday,
        //     gender: gender,
        //     formData,
        //
        //     roles: rolesInput,
        //     posts: postsInput,
        //     enclosures: corpus,
        // }
        formData, {
            headers: {
                "user-token": parseData().auth,
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            setErrors([])

            setResult(
                <div className="alert alert-success filter__input" role="alert">
                    Пользователь успешно создан, вы будете переправлены на страницу пользователя
                </div>
            )

            setTimeout(() => {
                let link = document.createElement("a")
                link.href = "/panel/users/" + res.data.data_response.id
                link.click()
            }, 5000)
        }).catch(err => {
            setErrors([])

            if(err.response && err.response.data && err.response.data.code === 400){
                setErrors(Object.values(err.response.data.data_response))
            }
        })
    }

    CheckAuthPage(checkAuth)

    useEffect(() => {
        getCheck().then(r => {})
        getDataPage().then(r => {})

        getPosts().then(r => {})
        getCorpuses().then(r => {})
        getRoles().then(r => {})

        setInterval(() => {
            let inputBirthday: any = document.querySelector(".input__birthday")

            setQRToken(v4() + v4())
            QRcode.toDataURL(process.env.REACT_APP_API_SERVER + "service-api/employee-verify/" + qrToken).then(url => {
                setHashQRImage(url)
            })

            let selectPosts: any = document.querySelector(".select__posts")
            let arrayPosts: any = [...selectPosts]

            let selectRoles: any = document.querySelector(".select__roles")
            let arrayRoles: any = [...selectRoles]

            let selectCorpus: any = document.querySelector(".select__corpus")
            let arrayCorpus: any = [...selectCorpus]

            if(inputBirthday){
                let validBirthday = inputBirthday.value
                validBirthday = validBirthday.split("/")

                setBirthday(validBirthday[1] + "." + validBirthday[0] + "." + validBirthday[2])
            }
            if(selectPosts) serPostsInput(arrayPosts.filter((option: any) => option.selected).map((option: any) => option.value).join(""))
            if(selectRoles) serRolesInput(arrayRoles.filter((option: any) => option.selected).map((option: any) => option.value).join(""))
            if(selectCorpus) setCorpus(arrayCorpus.filter((option: any) => option.selected).map((option: any) => option.value).join(""))

        }, 1000)

    }, []);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col-sm-12">
                            <h1 className="m-0">Создание пользователя</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    {
                        roles &&
                        roles.length !== 0 &&
                        posts &&
                        posts.length !== 0 &&
                        enclosures &&
                        enclosures.length !== 0 ? "" : (
                            <div className="spinner-border m-5 mb-3" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </div>
                        )
                    }
                    {
                        errors && errors.map((error: string, key: number) => (
                            <div key={key} className="alert alert-danger filter__input" role="alert">{error}</div>
                        ))
                    }
                    { result }
                                    <div className="row">
                                <div className="form-group filter__input">
                                    <label>Логин пользователя</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Введите логин пользователя"
                                        onInput={(e: any) => {setLogin(e.target.value)}}
                                        disabled={disabled}
                                    />
                                </div>
                                <div className="form-group filter__input">
                                    <label>Пароль пользователя</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Введите пароль пользователя"
                                        onInput={(e: any) => {setPassword(e.target.value)}}
                                        disabled={disabled}
                                    />
                                </div>
                                <div className="form-group filter__input">
                                    <label>Повторный пароль пользователя</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Повторите пароль пользователя"
                                        onInput={(e: any) => {setAgainPassword(e.target.value)}}
                                        disabled={disabled}
                                    />
                                </div>
                                <div className="form-group filter__input">
                                    <label>Имя пользователя</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Введите имя пользователя"
                                        onInput={(e: any) => {setName(e.target.value)}}
                                        disabled={disabled}
                                    />
                                </div>
                                <div className="form-group filter__input">
                                    <label>Фамилия пользователя</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Введите фамилию пользователя"
                                        onInput={(e: any) => {setSurname(e.target.value)}}
                                        disabled={disabled}
                                    />
                                </div>
                                <div className="form-group filter__input">
                                    <label>Отчество пользователя</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Введите отчество пользователя"
                                        onInput={(e: any) => {setPatronymic(e.target.value)}}
                                        disabled={disabled}
                                    />
                                </div>

                                <div className="form-group filter__input">
                                    <label>Дата рождения пользователя</label>
                                    <div className="input-group date" id="reservationdate" data-target-input="nearest">
                                        <input
                                            type="text"
                                            className="form-control datetimepicker-input input__birthday"
                                            data-target="#reservationdate"
                                            placeholder={"Введите дату рождения"}
                                            disabled={disabled}
                                        />
                                        <div className="input-group-append"
                                             data-target="#reservationdate"
                                             data-toggle="datetimepicker"
                                        >
                                            <div className="input-group-text"><i className="fa fa-calendar" /></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group filter__input">
                                    <label>Пол пользователя</label>
                                    <select
                                        className="form-control"
                                        defaultValue={"Выберите пол"}
                                        disabled={disabled}
                                        onChange={(e: any) => {setGender(e.target.value)}}
                                    >
                                        <option disabled>Выберите пол</option>
                                        <option value={"м"}>Мужской</option>
                                        <option value={"ж"}>Женский</option>
                                    </select>
                                </div>


                                <div className="form-group filter__input" data-select2-id="94">
                                    <label>Должности</label>
                                    <select
                                        className="select2 dark dark-mode selectPosts select2-hidden-accessible select__posts"
                                        multiple={true}
                                        data-placeholder="Выберите должности"
                                        style={{"width": "100%"}}
                                        data-select2-id="7"
                                        tabIndex={-1}
                                        aria-hidden="true"
                                        disabled={disabled}
                                    >
                                        {
                                            posts && posts.map((post, key: number) => (
                                                <option value={key + 1} key={key} data-select2-id={95 + key}>{post}</option>
                                            ))
                                        }
                                    </select>
                                    <span
                                        className="select2 selectPosts dark select2-container select2-container--default select2-container--below"
                                        dir="ltr"
                                        data-select2-id="8"
                                        style={{"width": "100%"}}>
                                <span className="selection">
                                    <span
                                        className="select2-selection select2-selection--multiple"
                                        role="combobox"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        tabIndex={-1}
                                        aria-disabled="false">
                                        <ul className="select2-selection__rendered">
                                            <li className="select2-search select2-search--inline">
                                                <input
                                                    className="select2-search__field"
                                                    type="search" tabIndex={0}
                                                    autoComplete="off"
                                                    autoCorrect="off"
                                                    autoCapitalize="none"
                                                    spellCheck="false" role="searchbox"
                                                    aria-autocomplete="list"
                                                    placeholder="Select a State"
                                                    style={{"width": "488.5px"}} />
                                            </li>
                                        </ul>
                                    </span>
                                </span>
                                <span className="dropdown-wrapper" aria-hidden="true" /></span>
                                </div>



                                <div className="form-group filter__input" data-select2-id="1008">
                                    <label>Корпуса</label>
                                    <select
                                        className="select2 dark dark-mode selectPosts select2-hidden-accessible select__corpus"
                                        multiple={true}
                                        data-placeholder="Выберите корпуса"
                                        style={{"width": "100%"}}
                                        data-select2-id="1009"
                                        tabIndex={-1}
                                        aria-hidden="true"
                                        disabled={disabled}
                                    >
                                        {
                                            enclosures && enclosures.map((corpus, key: number) => (
                                                <option value={key + 1} key={key} data-select2-id={150 + key}>{corpus}</option>
                                            ))
                                        }
                                    </select>
                                    <span
                                        className="select2 selectPosts dark select2-container select2-container--default select2-container--below"
                                        dir="ltr"
                                        data-select2-id="1010"
                                        style={{"width": "100%"}}>
                                <span className="selection">
                                    <span
                                        className="select2-selection select2-selection--multiple"
                                        role="combobox"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        tabIndex={-1}
                                        aria-disabled="false">
                                        <ul className="select2-selection__rendered">
                                            <li className="select2-search select2-search--inline">
                                                <input
                                                    className="select2-search__field"
                                                    type="search" tabIndex={0}
                                                    autoComplete="off"
                                                    autoCorrect="off"
                                                    autoCapitalize="none"
                                                    spellCheck="false" role="searchbox"
                                                    aria-autocomplete="list"
                                                    placeholder="Select a State"
                                                    style={{"width": "488.5px"}} />
                                            </li>
                                        </ul>
                                    </span>
                                </span>
                                <span className="dropdown-wrapper" aria-hidden="true" /></span>
                                </div>



                                <div className="form-group filter__input" data-select2-id="1111">
                                    <label>Роли в системе</label>
                                    <select
                                        className="select2 dark dark-mode selectPosts select2-hidden-accessible select__roles"
                                        multiple={true}
                                        data-placeholder="Выберите роли пользователя"
                                        style={{"width": "100%"}}
                                        data-select2-id="1112"
                                        tabIndex={-1}
                                        aria-hidden="true"
                                        disabled={disabled}
                                    >
                                        {
                                            roles && roles.map((role, key: number) => (
                                                <option value={key + 1} key={key} data-select2-id={200 + key}>{role}</option>
                                            ))
                                        }
                                    </select>
                                    <span
                                        className="select2 selectPosts dark select2-container select2-container--default select2-container--below"
                                        dir="ltr"
                                        data-select2-id="1113"
                                        style={{"width": "100%"}}>
                                <span className="selection">
                                    <span
                                        className="select2-selection select2-selection--multiple"
                                        role="combobox"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        tabIndex={-1}
                                        aria-disabled="false">
                                        <ul className="select2-selection__rendered">
                                            <li className="select2-search select2-search--inline">
                                                <input
                                                    className="select2-search__field"
                                                    type="search" tabIndex={0}
                                                    autoComplete="off"
                                                    autoCorrect="off"
                                                    autoCapitalize="none"
                                                    spellCheck="false" role="searchbox"
                                                    aria-autocomplete="list"
                                                    placeholder="Select a State"
                                                    style={{"width": "488.5px"}} />
                                            </li>
                                        </ul>
                                    </span>
                                </span>
                                <span className="dropdown-wrapper" aria-hidden="true" /></span>
                                </div>


                                <div className="form-group filter__input">
                                    <label htmlFor="exampleInputFile">Изображение профиля пользователя</label>
                                    <div className="input-group">
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                className="custom-file-input input__file"
                                                id="exampleInputFile"
                                                disabled={disabled}
                                                onChange={(e: any) => {setImage(e.target.files[0])}}
                                            />
                                            <label className="custom-file-label fileText" htmlFor="exampleInputFile">Выберите файл изображения</label>
                                        </div>
                                    </div>
                                </div>
                         </div>
                    <button className="btn btn-primary d-inline mb-3" onClick={() => {validation().then(r => {})}}>Создать пользователя</button>
                    </div>
            </section>
        </div>
    );
};

export default AdminCreateUser;
