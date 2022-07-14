export function parseData(){
    if(!localStorage.getItem("auth")){
        const obj = {
            "auth": "",
            "roles": []
        }
        localStorage.setItem("auth", JSON.stringify(obj));
    }

    return JSON.parse(localStorage.getItem("auth") as string)
}