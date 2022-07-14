import React from 'react';

const MainContent = () => {

    function exitSite(): void{ window.close() }

    return (
        <div className="container-lg mt-5">
            <h1>АИС Учета Сотрудников</h1>
            <p>Для взаимодействия с данной системой вам необходимо авторизоваться</p>
            <button
                className="btn btn-info me-3"
                data-bs-toggle="modal"
                data-bs-target="#authModal"
            >Авторизоваться</button>
            <button className="btn btn-danger" onClick={exitSite}>Выйти из системы</button>
        </div>
    );
};

export default MainContent;
