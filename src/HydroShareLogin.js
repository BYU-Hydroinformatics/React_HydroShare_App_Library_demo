import React from "react";

export default function HydroShareLogin(props) {

    return (
        <form>

            <input type="text"
                   style={{minWidth: 21.5 + 'em'}}
                   value={props.name}
                   placeholder={props.name ? props.name : "Change Username (For Demo Purposes Only)"}
                   onChange={(e) => {
                       props.onChange(e.target.value)
                   }}
            />

        </form>
    );
}