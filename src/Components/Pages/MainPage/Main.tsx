import React from 'react';
import MainNavbar from "./MainNavbar";
import MainContent from "./MainContent";
import Mainmodal from "./MainModal";

const Main = () => {
    return (
        <>
            <div className="main-content-styling">
                <MainNavbar />
                <MainContent />
                <Mainmodal />
            </div>
        </>
    );
};

export default Main;
