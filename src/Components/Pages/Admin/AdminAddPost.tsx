import React, {useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";
import CheckAuthPage from "../../Functions/CheckAAuthPage";
import {getData} from "../../Functions/GetData";
import axios from "axios";
import {parseData} from "../../Functions/ParseData";

const AdminAddPost = () => {

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
    const [inputPost, setInputPost] = useState("")
    const [posts, setPosts]: any = useState()
    async function getPosts(){
        await axios.get(process.env.REACT_APP_API_SERVER + "service-api/get-posts", {
            headers: {
                "user-token": parseData().auth
            }
        }).then(res => {
            if(res && res.data && res.data.data_response){
                setPosts(res.data.data_response.map((el: any) => el.split("").map((elem: any) => elem.toLowerCase()).join("")))
            }
        })
    }

    async function addPost(){
        let inputValue = inputPost.trim().split("").map((elem: any) => elem.toLowerCase()).join("")
        setAddError("")

        if(inputValue === ""){
            setAddError(
                <div className="alert alert-danger filter__input" role="alert">
                  Поле должности обязательно для заполнения
                </div>
            )
        } else if(posts.includes(inputValue)){
            setAddError(
                <div className="alert alert-danger filter__input" role="alert">
                    Такая специальность уже существует в системе
                </div>
            )
        } else {
            await axios.post(process.env.REACT_APP_API_SERVER + "service-api/add-post", {
                post: inputPost.split("").map((el: any, i) => i === 0 ? el.toUpperCase() : el).join("")
            }, {
                headers: {
                    "user-token": parseData().auth
                }
            })

            setAddError(
                <div className="alert alert-success filter__input" role="alert">
                    Специальность успешно добавлена
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
        getPosts().then(r => {})
    }, []);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col-sm-12">
                            <h1 className="m-0">Добавить должность</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    {
                        posts ? (
                            <>
                                {
                                    addError
                                }
                                <input
                                    type="text"
                                    onInput={(e: any) => setInputPost(e.target.value)}
                                    placeholder={"Введите специальность"}
                                    className="form-control filter__input mb-3"
                                />
                                <button className="btn btn-primary" onClick={() => {addPost().then(r => {})}}>Добавить</button>
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

export default AdminAddPost;
