import React, {useEffect, useState} from 'react';
import {CheckAuth} from "../../Functions/CheckAuth";

const AdminFooter = () => {

    const [checkAuth, setCheckAuth] = useState()

    async function checkAuthFunc(){
        const auth: any = await CheckAuth()
        setCheckAuth(auth)
    }

    useEffect(() => {
        checkAuthFunc().then(r => {})
    }, []);

    const time = new Date().getFullYear()




    return (
        !checkAuth ? <></> : <footer className="main-footer">
            <strong>Copyright &copy; {time} <span>АИС Учета Сотрудников</span>. </strong>
            Все права защищены.
            <div className="float-right d-none d-sm-inline-block">
                <b>Версия</b> 1.0.0
            </div>
        </footer>
    );
};

export default AdminFooter;
