import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Main from "./Components/Pages/MainPage/Main";
import PrivatePolicy from "./Components/Pages/MainPage/PrivatePolicy";
import {CheckAuth} from "./Components/Functions/CheckAuth";
import AdminNavbar from "./Components/Pages/Admin/AdminNavbar";
import AdminPage from "./Components/Pages/Admin/AdminPage";
import "./Components/Shared/Styles/app.scss"
import Sidebar from "./Components/Pages/Admin/Sidebar";
import AdminFooter from "./Components/Pages/Admin/AdminFooter";
import ExitPage from "./Components/Pages/Admin/ExitPage";
import _404 from "./Components/Pages/Admin/_404";
import AdminDataAccount from "./Components/Pages/Admin/AdminDataAccount";
import AdminViewPageActiveData from "./Components/Pages/Admin/AdminViewPageActiveData";
import AdminFilterMonth from "./Components/Pages/Admin/AdminFilterMonth";
import AdminFilterYear from "./Components/Pages/Admin/AdminFilterYear";
import AdminFilterDate from "./Components/Pages/Admin/AdminFilterDate";
import AdminAddPost from "./Components/Pages/Admin/AdminAddPost";
import AdminAddCorpus from "./Components/Pages/Admin/AdminAddCorpus";
import AdminLogs from "./Components/Pages/Admin/AdminLogs";
import AdminAllUsers from "./Components/Pages/Admin/AdminAllUsers";
import AdminOneUser from "./Components/Pages/Admin/AdminOneUser";
import AdminScanner from "./Components/Pages/Admin/AdminScanner";
import AdminCreateUser from "./Components/Pages/Admin/AdminCreateUser";
import AdminAllDatas from "./Components/Pages/Admin/AdminAllDatas";
import AdminOneData from "./Components/Pages/Admin/AdminOneData";

const checkAuth = CheckAuth()

function App() {

  return (
    <div className={"App" + checkAuth ? "wrapper" : ""}>
        <Router>
            <AdminNavbar />
            <Sidebar />
            <Routes>
                {/* unauthorized */}
                <Route
                    path={"/"}
                    element={<Main />}
                />
                <Route
                    path={"/private-policy"}
                    element={<PrivatePolicy />}
                />

            {/*  authorized  */}

                <Route
                    path={"/panel"}
                    element={<AdminPage />}
                />
                <Route
                    path={"/exit"}
                    element={<ExitPage />}
                />
                <Route
                    path={"/panel/user/account"}
                    element={<AdminDataAccount />}
                />
                <Route
                    path={"/panel/active/view"}
                    element={<AdminViewPageActiveData />}
                />
                <Route
                    path={"/panel/filter/month"}
                    element={<AdminFilterMonth />}
                />
                <Route
                    path={"/panel/filter/year"}
                    element={<AdminFilterYear />}
                />
                <Route
                    path={"/panel/filter/date"}
                    element={<AdminFilterDate />}
                />
                <Route
                    path={"/panel/add/post"}
                    element={<AdminAddPost />}
                />
                <Route
                    path={"/panel/add/corpus"}
                    element={<AdminAddCorpus />}
                />
                <Route
                    path={"/panel/add/user"}
                    element={<AdminCreateUser />}
                />
                <Route
                    path={"/panel/logs"}
                    element={<AdminLogs />}
                />
                <Route
                    path={"/panel/users"}
                    element={<AdminAllUsers />}
                />
                <Route
                    path={"/panel/users/:id"}
                    element={<AdminOneUser />}
                />
                <Route
                    path={"/panel/scanner"}
                    element={<AdminScanner />}
                />
                <Route
                    path={"/panel/works"}
                    element={<AdminAllDatas />}
                />
                <Route
                    path={"/panel/works/:date"}
                    element={<AdminOneData />}
                />


                <Route
                    path={"*"}
                    element={<_404 />}
                />
            </Routes>
            <AdminFooter />
        </Router>
    </div>
  );
}

export default App;
