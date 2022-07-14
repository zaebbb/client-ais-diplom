import {parseData} from "./ParseData";
import axios from "axios";

export async function getData(authToken: string = parseData().auth){
    let result = await axios.get(process.env.REACT_APP_API_SERVER + "service-api/user-data", {
        headers: {
            "user-token": authToken
        }
    }).then(res => {
        return res
    }).catch(err => {
        return err.response
    })

    // console.log(result)
    return result
}