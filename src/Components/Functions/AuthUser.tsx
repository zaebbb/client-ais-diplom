import axios from "axios";

type authData = {
    login: string,
    password: string
}

type authType = {
    auth: string,
    roles: string[]
}

export function AuthUser(classForm: string = "", data: authData, saveData: boolean){
    const form: any = document.querySelector(classForm)
    const formData = new FormData(form)

    formData.append("login", data.login)
    formData.append("password", data.password)

    if(saveData){
        localStorage.setItem("saveData", JSON.stringify(data))
    }

    let result = false

    // отправка данных
    const authEnter = axios.post(process.env.REACT_APP_API_SERVER + "service-api/login", {
        login: data.login,
        password: data.password
    }).then(res => {

        let token: string = ""
        let roles: string[] = []

        if(res && res.data && res.data.data_response && res.data.data_response.token && res.data.data_response.roles){
            token = res.data.data_response.token
            roles = [...res.data.data_response.roles]

            const authData: authType = {
                auth: token,
                roles: roles
            }

            localStorage.setItem("auth", JSON.stringify(authData));

            localStorage.setItem("saveData", JSON.stringify({
                login: "",
                password: ""
            }))

            window.location.href = "/panel"

            result = true
            return true
        }

        return false
    }).catch(err => {
        console.log(err.response)
        return false
    })

    return authEnter.then(res => res)
}

export function GetSaveData(): any{
    const saveData: any = localStorage.getItem("saveData")
    if(localStorage.getItem("saveData")){ return JSON.parse(saveData) }

    return false
}