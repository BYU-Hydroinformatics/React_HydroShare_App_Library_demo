import './App.css';
import React from "react";

import {DynamicTable} from "./DynamicTable.js";

/*function getHydroShareUser(){
    const url = "https://www.hydroshare.org/hsapi/user/";
    fetch(url)
        .then (function (response){
            if(response.ok){
                return(response.json())
            }
            throw new Error("User Not Obtained from HydroShare")
        })
        .then (function (data){
            //console.log(data)
            if(typeof data.id !== 'undefined'){
                return data.id;
            }
            else{
                return "";
            }
        })
}
*/

function HydroShareLogin(props) {

    return(
        <form>

            <input type="text"
                   style={{minWidth: 21.5+'em'}}
                   value={props.name}
                   placeholder={props.name ? props.name: "Change Username (For Demo Purposes Only)"}
                   onChange={(e)=>{
                       props.onChange(e.target.value)
                   }}

            />

        </form>
    );
}

function App() {
    const initial_user="Shawn Crawley";
    const[username,setUsername] = React.useState(initial_user);
    return (
        <div>
            <HydroShareLogin
                onChange={(a)=>{setUsername(a) }}
            />
            <DynamicTable user={username} key={username}/>
        </div>
    );
}

export default App;
