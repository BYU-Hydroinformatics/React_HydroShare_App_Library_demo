import './App.css';
import React, {Suspense, lazy} from "react";

import HydroShareLogin from "./HydroShareLogin";
import Introduction from "./Introduction";
import Loading from "./Loading";


const DynamicTable = lazy(() => import("./DynamicTable"))


function App() {
    const initial_user = "Shawn Crawley";
    const [username, setUsername] = React.useState(initial_user);
    return (
        <>
            <HydroShareLogin onChange={(a) => {
                setUsername(a)
            }}/>
            <Introduction/>
            <Suspense fallback={<Loading/>}>
                <DynamicTable user={username} key={username}/>
            </Suspense>
        </>
    );
}

export default App;
