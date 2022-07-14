import axios from "axios";
import {parseData} from "./ParseData";

export async function CheckAuth(){
    if(!localStorage.getItem("auth")){
        const obj = {
            "auth": "",
            "roles": []
        }
        localStorage.setItem("auth", JSON.stringify(obj));
    }

    let result: any = false

    const authGet = async () => {

        const getData = await axios.get(process.env.REACT_APP_API_SERVER + "service-api/check-auth", {
            headers: {
                "user-token": parseData().auth,
                "Content-type": "application/json"
            }
        }).then(res => {
            if (res && res.data && res.data.data_response && res.data.data_response.check_result) {
                result = true
                return true
            }

            result = false
            return false

        }).catch(err => {
            if (err && err.response && err.response.data && err.response.data.data_response && err.response.data.data_response.check_result) {
                result = false
                return false
            }
            return false
        })

        return getData
    }

    result = await authGet().then(result => result)

    return result
}