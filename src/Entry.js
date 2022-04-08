import React from "react";
import app_logo from "./img/app_icon.png";
import cuahsi_logo from "./img/cuahsi_logo.png";

let InputView = require("./InputView.js")

function EntryTag(props){
    /**
     * This function displays the tags for a given entry.
     * Inputs: props an object with a tagBooleans list
     *         tagBooleans is a list of three booleans (isCUAHSIapp, isCommunityapp, and isPersonalapp)
     * Returns: div of entry tags to be displayed by entry class
     */
    const values=props.tagBooleans;
    let response=[]
    if(values.length!==3){
        console.log("This function was not called properly")
        return null;
    }
    const sum=values[0]+values[1]+values[2];
    if(sum===0){
        console.log("This entry does not have any tags")
        return null;
    }
    else if(sum ===3 ||(values[0]&&values[1])){
        console.log("This entry's tags were not set up properly")
    }
    else if(sum === 2){
        if (values[0]){
            response.push(<p key={sum}>
                <img src={cuahsi_logo} className="image-tags-image"
                     title="CUAHSI Endorsed App"
                     alt="CUAHSI Endorsed App"/>
                CUAHSI Endorsed and Personal App
            </p>);
        }
        else {
            response.push(<p key={sum}>
                Community and Personal App
            </p>);
        }
    }
    else{
        if(values[0]){
            response.push(<p key={sum}>
                <img src={cuahsi_logo} className="image-tags-image"
                     title="CUAHSI Endorsed App"
                     alt="CUAHSI Endorsed App"/>
                CUAHSI Endorsed App
            </p>);
        }
        else if(values[1]){
            response.push(<p key={sum}>
                Community App
            </p>);
        }
        else if(values[2]){
            response.push(<p key={sum}>
                Personal App
            </p>);
        }
        else{
            console.log("There is an error with the EntryTag function")
        }
    }
    return (<div className="image-tags">{response}</div>);
}

function ExpandedView(props) {
    if (props.state) {
        return (
            <div className={props.color + ' app-grid-expanded'}>
                <div><b>Keywords: </b>{props.metadata.keywords}</div>
                <div><b>Home Page
                    URL: </b><a href={props.metadata.app_home_page_url?.value ? props.metadata.app_home_page_url.value : undefined}>{props.metadata?.app_home_page_url?.value}</a>
                </div>
                <div><b>Version: </b>{props.metadata?.version?.value}</div>
                <div><b>Date Created: </b>{props.metadata.date_created?.split("T")[0]}</div>
                <div><b>Last Update: </b>{props.metadata.date_last_updated?.split("T")[0]}</div>
                <div><b>Supported Resource Types: </b>{props.metadata?.supported_resource_types_string}</div>
                <div><b>App-launching Resource Level URL Pattern: </b>{props.metadata?.url_base_aggregation?.value}
                </div>
                <div><b>Supported Aggregation Types: </b>{props.metadata.supported_aggregation_types_string}</div>
                <div><b>Supported File Extensions: </b>{props.metadata?.supported_file_extensions?.value}</div>
                <div className="app-citation">
                    <b>Copyright: </b> {props.metadata.rights}
                </div>
            </div>
        );
    }
    return null;
}

class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedState: false,
            color: props.position % 2 === 0 ? 'light-theme' : 'dark-theme',
            metadata: props.metadata,
            key: props.position,
            refresh_images:false,
        }

        if( this.state.metadata?.app_icon?.value ===""|| !this.state.metadata.app_icon){
            this.state.metadata.app_icon={value:app_logo};
        }

        this.changeExpandedState = this.changeExpandedState.bind(this);
        this.changeShowInputs = this.changeShowInputs.bind(this);
    }

    changeExpandedState() { //onclick method
        if (!this.state.expandedState === false && !this.state.expandedState === true) {
            this.setState({expandedState: false});
        } else {
            this.setState({expandedState: !this.state.expandedState});

        }
    }

    changeShowInputs() { //onclick method
        if (!this.state.showInputs === false && !this.state.showInputs === true) {
            return false;
        } else {
            return !this.state.showInputs;

        }
    }

    render() {
        return (
            <div className="full-entry" id={"App_Entry_#" + this.state.key} >
                <div
                    className={this.state.expandedState ? this.state.color + " entry expanded" : this.state.color + " entry"}>
                    <div className='grid-1-1'>
                        <a href={this.state.metadata?.app_home_page_url?.value} target="_blank" rel="noreferrer">
                            <img type="image"
                                 src={this.state.metadata.app_icon.value}
                                 alt={this.state.metadata.title}
                                 onError={(event) => {
                                     event.target.src = app_logo;
                                     event.onerror = null;
                                 }}
                            />
                        </a>
                    </div>
                    <div className="app-name"><a href={this.state.metadata.resource_url} target="_blank"
                                                 rel='noreferrer'>{this.state.metadata.resource_title}</a></div>
                    <div className="app-owner"><a
                        href={"https://www.hydroshare.org/" + this.state.metadata.creator_url} target="_blank"
                        rel='noreferrer'>{this.state.metadata.creator}</a></div>
                    <div className="image-tags">
                        <EntryTag tagBooleans={[this.state.metadata.isCuahsiApp,this.state.metadata.isCommunityApp,this.state.metadata.isPersonalApp]} />
                    </div>


                    <div className={this.state.expandedState ? "app-abstract-expanded" : "app-abstract"}>
                        {this.state.metadata.abstract}
                    </div>
                    <div className="app-expand">
                        <button className="btn btn-default button-expand" onClick={this.changeExpandedState}>
                            {this.state.expandedState ? 'Close' : 'Expand'}
                        </button>
                    </div>
                </div>
                <ExpandedView color={this.state.color} state={this.state.expandedState}
                              metadata={this.state.metadata}/>
                {this.state.showInputs ? <InputView key={this.state.key} formID={this.state.key}
                                                    url={this.state.metadata?.url_base_aggregation?.value}/> : null}

            </div>

        );

    }

}

export {Entry};