import './App.css';
import React from "react";

import {DynamicTable} from "./DynamicTable.js";

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
