import React from 'react';
import MainNavbar from "./MainNavbar";
import MainContent from "./MainContent";
import Mainmodal from "./MainModal";
import PrivatePolicyContent from "./PrivatePolicyContent";

const PrivatePolicy = () => {
    return (
        <>
            <div className="main-content-styling">
                <MainNavbar />
                <PrivatePolicyContent />
                <Mainmodal />
            </div>
        </>
    );
};

export default PrivatePolicy;
