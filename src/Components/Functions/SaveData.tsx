import axios from "axios";
import {parseData} from "./ParseData";

export async function saveData(apiService: string = ""){
    let result = await axios.post(process.env.REACT_APP_API_SERVER + "service-api/" + apiService, "", {
        headers: {
            "user-token": parseData().auth,
        }
    }).then(res => {
        if(res && res.data && res.data.data_response){
            let link = document.createElement("a")
            link.setAttribute("href", process.env.REACT_APP_API_SERVER + res.data.data_response.link)
            link.setAttribute("download", "download")
            link.setAttribute("target", "_blank")
            link.click()
        }
    })
}
