import React from "react";

const url_search = new RegExp(/\${HS_[A-Z]*_[A-Z]*}/g);

class InputView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            formID: props.formID,
            inputs: props.url.match(url_search),
            ref: []
        }
        this.openUrl = this.openUrl.bind(this);
        /*    let counter = 1;
            this.state.inputs.forEach(() => {
                this.state.ref[counter] = React.createRef()
                counter += 1;
            });*/

    }

    openUrl() {
        let c = 1;
        let finalUrl = '' + this.state.url;
        this.state.inputs.forEach((input) => {
            let value = this.state.ref[c].current.value;
            finalUrl = finalUrl.replace(input, value)
            c += 1;
        });
        window.open(finalUrl);
    }

    render() {
        const formInput = [];
        let count = 1;

        if (!this.state.url) {
            console.log("A url is Required")
            return null;
        }
        if (this.state.inputs.length <= 0) {
            console.log("This function should not of have been called")
            return null;
        }
        this.state.inputs.forEach((input) => {
            input = input.substring(2, input.length - 1)
            formInput.push(<div key={count}>
                <b>{input}: </b>
                <input type='text' title={input} id={input} defaultValue={input} ref={this.state.ref[count]}
                       form={this.state.formID}/>
            </div>)
            count += 1;
        });

        return (
            <div className="input-form">
                <p>This resource can open with the following inputs</p>
                <form id={this.state.formID}>
                    {formInput}
                    <input type="submit" value="Open With Inputs" onClick={this.openUrl}/>
                </form>
            </div>
        );
    }
}

export default InputView;