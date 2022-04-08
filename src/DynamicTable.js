import React from "react";
import header_logo from "./img/header.png";
import footer_logo from "./img/footer.png";
import {loadResources} from "./loadResources.js"

import {Entry} from "./Entry.js";


const defaultMaxInputs = 10;
const increaseMaxInputStepSize = 10;
const webapp_resources = [ '3fb11de2432e46aaacd70499fd680e6d','6946805f095e46f495b6ab1c6dc064b5', '9e860803f84940358a4dd0e563a96572', 'd5ac4340c7ff454f9c57dce43da2d625', '56d20d162e904deb8cc2f472f3dbb723', 'd858daeab3214e00909bcd87052eb919' ,'4cfd280e8eb747169b293aec2862d4f5','33c45575b95f45c4bf7335faab67ed36', '70070fa1b382496e85ca44894683b15d']
//This is a temporary variable that exists in hydroshare of cuahsi approved web apps

function Introduction(){
    return (<div className="introduction">
        Welcome to the HydroShare App Library. The App Library allows you to discover web apps created by CUAHSI and other HydroShare users. You can launch web apps directly by clicking on the web app icon. Alternatively you can click on the title to visit the web app connector landing page.
    </div> )
}

class DynamicTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: props.entries,
            currentUser: props.user,
            ids: webapp_resources,
            searchString: "",
            checkboxIds: ["checkboxMy", "checkboxCUAHSI", "checkboxCommunity"],
            checkboxMy: true,
            checkboxCUAHSI: true,
            checkboxCommunity: true,
            maxInputs: defaultMaxInputs,
            entriesLoaded:false,
            displayRows:[],
            changeRows:true,
        }

        this.boxOnChange = this.boxOnChange.bind(this);
        this.searchOnChange = this.searchOnChange.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.addEntries = this.addEntries.bind(this);
        this.updateTable =this.updateTable.bind(this);
    }

    boxOnChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            changeRows:true,
        });
        this.updateTable()
    }

    searchOnChange(event) {
        this.setState({
            searchString: event.target.value,
            changeRows:true,
        });
        this.updateTable()
    }

    onLoadMore() {
        let newMax = this.state.maxInputs + increaseMaxInputStepSize
        this.setState({
            maxInputs: newMax,
            changeRows: true,
        });
        this.updateTable()
    }

    async addEntries(){
        let resources=await loadResources()
        if (!this.state.entriesLoaded && resources){
            this.setState({entries:resources, entriesLoaded:true})
        }
        this.updateTable()
    }

    updateTable(){
        if(!this.state.changeRows||!this.state.entriesLoaded){
            return;
        }
        this.setState({
            changeRows:false,
            displayRows:[],
        })
        let rows= [];
        let counter = 1;
        this.state.entries.forEach((currentEntry) => {
            currentEntry.isPersonalApp = currentEntry.creator.includes(this.state.currentUser) || !currentEntry.public;
            currentEntry.isCuahsiApp = this.state.ids.includes(currentEntry.resource_id);
            currentEntry.isCommunityApp = currentEntry.public && !(currentEntry.isCuahsiApp);

            let add_entry = false
            if ((this.state.checkboxCommunity && currentEntry.isCommunityApp) || (this.state.checkboxCUAHSI && currentEntry.isCuahsiApp) || (this.state.checkboxMy && currentEntry.isPersonalApp)) {
                if (this.state.searchString === "") {
                    add_entry = true;
                } else {
                    let searchable_array = Object.values(currentEntry)
                    searchable_array.forEach((meta) => {
                        if (meta !== null && meta.type !== Boolean && meta.toString().includes(this.state.searchString)) {
                            add_entry = true;
                        }
                    });
                }
                if (add_entry && (counter <= this.state.maxInputs)) {
                    counter += 1;
                    rows.push(
                        <Entry key={counter} position={counter} metadata={currentEntry}/>
                    )
                }
            }
        });
        this.setState({displayRows:rows})
    }

    render() {
        document.title = "HydroShare Demo App Library";
        this.addEntries()
        if(!this.state.entries){
            return null;
        }
        return (
            <div className="library-app">
                <img src={header_logo} alt="header" className={"image"}/>
                <br/>
                <h1>HydroShare Web Application Library</h1>
                <br/>
                {Introduction()}
                <div className="search-box form-group">
                    <input type="text"
                           id="search-box"
                           className="form-control"
                           defaultValue={this.state.searchString}
                           onChange={this.searchOnChange}
                           placeholder={"Search Public and Discoverable Web Applications"}
                    />
                    <br/>
                    <input
                        type="checkbox"
                        id={this.state.checkboxIds[0]}
                        className="form-check-input"
                        name={this.state.checkboxIds[0]}
                        onChange={this.boxOnChange}
                        checked={this.state.checkboxMy}
                    />
                    <label className="form-check-label form-check-inline" htmlFor="flexCheckDefault">
                        Personal Apps
                    </label>
                    <input
                        type="checkbox"
                        id={this.state.checkboxIds[1]}
                        className="form-check-input"
                        name={this.state.checkboxIds[1]}
                        onChange={this.boxOnChange}
                        checked={this.state.checkboxCUAHSI}
                    />
                    <label className="form-check-label form-check-inline" htmlFor="flexCheckDefault">
                        CUAHSI Endorsed Apps
                    </label>
                    <input
                        type="checkbox"
                        id={this.state.checkboxIds[2]}
                        className="form-check-input"
                        name={this.state.checkboxIds[2]}
                        onChange={this.boxOnChange}
                        checked={this.state.checkboxCommunity}
                    />
                    <label className="form-check-label form-check-inline" htmlFor="flexCheckDefault">
                        Community Apps
                    </label>
                </div>
                <div className='table'>
                    {this.state.displayRows}
                </div>
                <div className="infinite-scroll">
                    <button type="button" placeholder="Show More" className="load-more btn-default"
                            onClick={this.onLoadMore} disabled={this.state.maxInputs >= this.state?.entries.length}>Load More
                    </button>
                </div>
                <br/>
                <br/>
                <img src={footer_logo} alt="footer" className={"image"}/>
            </div>
        );
    }
}

export {DynamicTable};