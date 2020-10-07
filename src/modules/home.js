import React,{ useState, useEffect } from 'react';

const Home = () => {

    return (
        <div className="basic-container home-container">
            <div className="filter"></div>
            <h1>TrueGoalie</h1>
            <h2>Homepage</h2>
            {
                window.location.href.includes('registered=Success')
                ? <p>You have successfully registered</p>
                : window.location.href.includes('?login=Success')
                    ? <p>You have successfully logged in</p>
                    : null
            }
        </div>

    )
}
export default Home