import header_logo from "./img/header.png";
import React from "react";

export default function Introduction() {
    return (<>
            <img src={header_logo} alt="header" className={"image"}/>
            <br/>
            <h1>HydroShare Web Application Library</h1>
            <br/>
            <div className="introduction">
                Welcome to the HydroShare App Library. The App Library allows you to discover web apps created by CUAHSI
                and other HydroShare users. You can launch web apps directly by clicking on the web app icon.
                Alternatively you can click on the title to visit the web app connector landing page.
            </div>
        </>
    )
}