import './App.css';
import React from "react";
import cuahsi_logo from "./img/cuahsi_logo.png";
import community_logo from "./img/communities.png";
import personal_logo from "./img/personal.png";
import app_logo from "./img/app_icon.png";
import footer_logo from "./img/footer.png";
import header_logo from "./img/header.png";


const webapp_resources = [ '3fb11de2432e46aaacd70499fd680e6d','6946805f095e46f495b6ab1c6dc064b5', '9e860803f84940358a4dd0e563a96572', 'd5ac4340c7ff454f9c57dce43da2d625', '56d20d162e904deb8cc2f472f3dbb723', 'd858daeab3214e00909bcd87052eb919' ,'4cfd280e8eb747169b293aec2862d4f5','33c45575b95f45c4bf7335faab67ed36', '70070fa1b382496e85ca44894683b15d']
//This is a temporary variable that exists in hydroshare of cuahsi approved web apps

const url_search = new RegExp(/\${HS_[A-Z]*_[A-Z]*}/g);
const defaultMaxInputs = 10;
const increaseMaxInputStepSize = 10;

const backendUrl= "http://localhost:4000/auth/hydroshare"
const getResourcesUrl= "https://www.hydroshare.org/hsapi/resource/?edit_permission=false&published=false&type=ToolResource&include_obsolete=false";

function loadResources(){
    /**
     *  This function authenticates the user with HydroShare and then loads all web app connectors the user has access to.
     */

    fetch(getResourcesUrl)
        .then(function (response){
            if(response.ok){
                return(response.json());
            }
            throw new Error("Network response was not okay.");
        })
        .then(function (data){
            //console.log(data.results)
            addDublin(data.results)
    })
}

function addDublin(sciMetadata){
    Promise.all(sciMetadata.map( (resource) =>{
        let resourceId=resource.resource_id;
        const url= "https://www.hydroshare.org/hsapi/resource/"+resourceId+"/scimeta/elements/";
        return fetch(url)
            .then( function (response){
                if(response.ok)
                    return(response.json())
                throw new Error ("There was an error loading the Dublin metadata for "+resourceId);
            })
            .then(function (data){
                let fullResource= Object.assign({},resource,data);
                return (fullResource);
            });

    }))
        .then((data) =>{
            console.log(data.length)
            processMetadata(data)
        });
}

function processMetadata(fullMetadata){
    //todo: finish method
    fullMetadata.forEach(resource =>{
        //console.log(resource)

        resource.isCuahsiApp= webapp_resources.includes(resource.resource_id);
        resource.isPersonalApp= !resource.public;
        resource.isCommunityApp = !resource.isCuahsiApp && resource.public;

        resource.creators.forEach(creator =>{
            if(resource.creator === creator.name){
                resource.creator_url=creator.description;
            };
        });

        let concat ="";
        resource.subjects.forEach(subject =>{
            concat+=subject.value+", ";
        });
        resource.keywords=concat.slice(0, -2)

        concat="";
        resource?.supported_resource_types?.supported_res_types.forEach(res_type => {
            concat += res_type.description + ", ";
        });
        resource.supported_resource_types_string=concat.slice(0,-2)

        concat="";
        resource?.supported_aggregation_types?.supported_agg_types.forEach( agg_type =>{
            concat+= agg_type.description+", ";
        });
        resource.supported_aggregation_types_string=concat.slice(0, -2);


    });
    return(fullMetadata)
}

function getHydroShareUser(){
    const url = "https://www.hydroshare.org/hsapi/user/";
    fetch(url)
        .then (function (response){
            if(response.ok){
                return(response.json())
            }
            throw new Error("User Not Obtained from HydroShare")
        })
        .then (function (data){
            console.log(data)
            if(typeof data.id !== 'undefined'){
                return data.id;
            }
            else{
                return "";
            }
        })
}




function ExpandedView(props) {
    if (props.state) {
        return (
            <div className={props.color + ' app-grid-expanded'}>
                <div><b>Keywords: </b>{props.metadata.keywords}</div>
                <div><b>Home Page
                    URL: </b><a href={props.metadata.app_home_page_url.value ? props.metadata.app_home_page_url.value : undefined}>{props.metadata.app_home_page_url.value}</a>
                </div>
                <div><b>Version: </b>{props.metadata?.version?.value}</div>
                <div><b>Date Created: </b>{props.metadata.date_created?.split("T")[0]}</div>
                <div><b>Last Update: </b>{props.metadata.date_last_updated?.split("T")[0]}</div>
                <div><b>Supported Resource Types: </b>{props.metadata.supported_resource_types_string}</div>
                <div><b>App-launching Resource Level URL
                    Pattern: </b>{props.metadata?.url_base_aggregation?.value}
                </div>
                <div><b>Supported Aggregation Types: </b>{props.metadata.supported_aggregation_types_string}</div>
                <div><b>Supported File Extensions: </b>{props.metadata?.supported_file_extensions?.value}</div>
                <div><b>Source Code URL: </b><a
                    href={props.metadata.sourceUrl ? props.metadata.sourceUrl : undefined}>{props.metadata.sourceUrl}</a></div>
                <div><b>Help Page URL: </b><a
                    href={props.metadata.helpUrl ? props.metadata.helpUrl : undefined}>{props.metadata.helpUrl}</a></div>
                <div><b>Mailing List URL: </b><a
                    href={props.metadata.mailUrl ? props.metadata.mailUrl : undefined}>{props.metadata.mailUrl}</a></div>

                <div><b>Issues Page URL: </b><a
                    href={props.metadata.issueUrl ? props.metadata.issueUrl : undefined}>{props.metadata.issueUrl}</a></div>
                <div className="app-citation">
                    <b>Citation: </b> {props.metadata.citation}
                </div>
            </div>
        );
    }
    return null;
}

function HydroShareLogin() {

    return(
        <form action={backendUrl}>
            <button type="submit" className="login-button">
                <span className="button-text"> Sign in with HydroShare</span>
            </button>
        </form>
    );
}

function TagsDiv(props) {
    if (!props.value) {
        return null;
    }
    let link;
    let title;
    if (props.image === 'cuahsi') {
        link = cuahsi_logo;
        title = "CUAHSI App"
    } else if (props.image === 'community') {
        link = community_logo;
        title = "Community App"
    } else if (props.image === 'personal') {
        link = personal_logo;
        title = "My Personal App"
    } else {
        console.log("The following image is invalid " + props.image);
        return null;
    }
    return (
        <img src={link} className="image-tags-image"
             title={title}
             alt={title}/>
    );
}

function App() {

    loadResources()

    class DynamicTable extends React.Component {
        constructor(props) {
            super(props);
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
            }

            this.boxOnChange = this.boxOnChange.bind(this);
            this.searchOnChange = this.searchOnChange.bind(this);
            this.onLoadMore = this.onLoadMore.bind(this);
        }

        boxOnChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            this.setState({
                [name]: value
            });
        }

        searchOnChange(event) {
            this.setState({searchString: event.target.value});
        }

        onLoadMore() {
            let newMax = this.state.maxInputs + increaseMaxInputStepSize
            this.setState({maxInputs: newMax});
        }


        render() {
            document.title = "HydroShare Demo App Library";
            const rows = [];
            let counter = 1;
            this.state.entries.forEach((currentEntry) => {
                //todo: update how apps are organized into tiers. Namely personal apps should include all apps the creator has made as well as all discoverable web apps shared to them.
                currentEntry.isPersonalApp = currentEntry.creator.includes(this.state.currentUser);
                currentEntry.isCuahsiApp = this.state.ids.includes(currentEntry.resourceUrl.split('/')[4]);
                currentEntry.isCommunityApp = !(currentEntry.isCuahsiApp || currentEntry.isPersonalApp);
                let add_entry = false
                if ((this.state.checkboxCommunity && currentEntry.isCommunityApp) || (this.state.checkboxCUAHSI && currentEntry.isCuahsiApp) || (this.state.checkboxMy && currentEntry.isPersonalApp)) {
                    let searchable_array = Object.values(currentEntry)
                    searchable_array.forEach((meta) => {
                        if (meta !== null && meta.type !== Boolean && meta.toString().includes(this.state.searchString)) {
                            add_entry = true;
                        }
                    });

                    if (add_entry && (counter <= this.state.maxInputs)) {
                        rows.push(
                            <Entry key={counter} position={counter} metadata={currentEntry}/>
                        )
                    }
                }
                counter += 1;
            });
            return (
                <div className="library-app">
                    <img src={header_logo} alt="header" className={"image"}/>
                    <br/>
                    <h1>HydroShare Web Application Library</h1>
                    <br/>
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
                            My Apps
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
                        {rows}
                    </div>
                    <div className="infinite-scroll">
                        <button type="button" placeholder="Show More" className="load-more btn-default"
                                onClick={this.onLoadMore}>Load More
                        </button>
                    </div>
                    <br/>
                    <br/>
                    <img src={footer_logo} alt="footer" className={"image"}/>
                </div>
            );
        }
    }

    class Entry extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                expandedState: false,
                color: props.position % 2 === 0 ? 'light-theme' : 'dark-theme',
                metadata: props.metadata,
                key: props.position,
            }

            if(this.state.metadata.app_icon.value ===""){
                this.state.metadata.app_icon.value =app_logo;
            }

            this.changeExpandedState = this.changeExpandedState.bind(this);
            this.changeShowInputs = this.changeShowInputs.bind(this);
            this.InputButton = this.InputButton.bind(this);
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

        InputButton() {
            //todo: remove method
            if ((!this.state.metadata.url_base_aggregation?.value) || this.state.metadata.url_base_aggregation.value.search(url_search) === -1) {
                return null;
            }
            return (
                <button className={"btn btn-default"}
                    /*onClick={() => {this.setState({showInputs: this.changeShowInputs()}) }}*/
                >
                    {/*<img src={inputs_logo} alt="Optional HydroShare inputs. Click to view."/>*/}
                    Run Demo
                </button>
            );
        }

        render() {
            return (
                <div className="full-entry" id={"App_Entry_#" + this.state.key}>
                    <div
                        className={this.state.expandedState ? this.state.color + " entry expanded" : this.state.color + " entry"}>
                        <div className='grid-1-1'>
                            <a href={this.state.metadata.app_home_page_url.value} target="_blank" rel="noreferrer">
                                <input type="image"
                                       src={this.state.metadata.app_icon.value}
                                       alt={this.state.metadata.title}
                                />
                            </a>
                        </div>
                        <div className="image-tags">
                            <TagsDiv image={'cuahsi'} value={this.state.metadata.isCuahsiApp}/>
                            <TagsDiv image={'community'} value={this.state.metadata.isCommunityApp}/>
                            <TagsDiv image={'personal'} value={this.state.metadata.isPersonalApp}/>
                        </div>
                        <div className="app-name"><a href={this.state.metadata.resourceUrl} target="_blank"
                                                     rel='noreferrer'>{this.state.metadata.name}</a></div>
                        <div className="app-owner"><a
                            href={"https://www.hydroshare.org/" + this.state.metadata.creator_url} target="_blank"
                            rel='noreferrer'>{this.state.metadata.creator}</a></div>
                        <div className="app-inputs">
                            {this.InputButton()}
                        </div>
                        <div className={this.state.expandedState ? "app-abstract-expanded" : "app-abstract"}>
                            <b>Abstract: </b>{this.state.metadata.abstract}
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
            let counter = 1;
            this.state.inputs.forEach(() => {
                this.state.ref[counter] = React.createRef()
                counter += 1;
            });

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



    return (
        <div>
            <HydroShareLogin />
            <DynamicTable user={'Hart Henrichsen'}
                          entries={
                              [
                {
                    'name': 'City Water Model',
                    'creator': 'Hart Henrichsen',
                    'creator_url': '/user/1001',
                    'resourceUrl': 'https://www.hydroshare.org/resource/b2697235ef6746d3963775399f092c4f/',
                    'abstract': 'This is some code I made over the weekend. It is not done yet, but will be really cool.',
                    'short_id': 'd8e7873da67e4d8e89d94e314585f6bc',
                    'isCommunityApp': false,
                    'app_home_page_url': {'value':'http://temp'},
                    'url_base_aggregation': {'value':'http://hyrax.hydroshare.org/opendap/${HS_RES_ID}/data/contents/${HS_FILE_PATH}.html'},
                    'app_icon':{'value': ""}
                },
                {
                    'name': 'HydroShare Pangeo',
                    'short_id': 'ed9ede792fc74856ba77aebf9443981f',
                    'resourceUrl': 'https://www.hydroshare.org/resource/ed9ede792fc74856ba77aebf9443981f/',
                    'isCommunityApp': false,
                    'creator': 'Bart Nijssen',
                    'creator_url': '/user/1005',
                    'url_base_aggregation': {'value':'http://hydro.pangeo.io'},
                    'abstract': 'The HydroShare Web App provides easy access to a containerized version of SUMMA as part of the NSF-funded Pangeo project. Pangeo uses docker images that contain SUMMA and pysumma and that allow SUMMA to be run from within Jupyter notebooks. The Pangeo instance enables SUMMA to be used in commercial cloud environments as well as for graduate education. [ Link to snow modeling course taught by Dr. Jessica Lundquist at the University of Washington as part of CUAHSI’s Virtual University in (Fall 2018; Fall 2019: Snow Hydrology and Modeling). Link to graduate course taught by Bart Nijssen at the University of Washington in Spring 2019 (CEWA 564 Advanced Hydrology).]\n' +
                        '\n',
                    'keywords': 'pysumma, summa, pangeo, jupyterhub, cloud computing',
                    'app_home_page_url': {'value':'http://hydro.pangeo.io'},
                    'version': null,
                    'views': 939,
                    'date_created': 'Sep 21, 2018 at 9:27 p.m.',
                    'date_last_updated': 'Dec 05, 2019 at 4:47 a.m.',
                    'supported_resource_types_string': 'Generic, Composite Resource',
                    'aggregationTypes': null,
                    'supported_file_extensions': null,
                    'helpUrl': null,
                    'mailUrl': null,
                    'issueUrl': null,
                    'citation': '\n' +
                        'Nijssen, B., C. Bandaragoda (2019). HydroShare Pangeo, HydroShare, http://www.hydroshare.org/resource/ed9ede792fc74856ba77aebf9443981f\t\n',
                    'app_icon': {'value': 'https://avatars1.githubusercontent.com/u/23299451?s=200&v=4'}
                },
                {
                    'name': 'Data Rods Explorer',
                    'resourceUrl': 'https://www.hydroshare.org/resource/9e860803f84940358a4dd0e563a96572/',
                    'isCommunityApp': false,
                    'creator': 'Zhiyu/Drew Li',
                    'creator_url': '/user/3',
                    'url_base_aggregation': null,
                    'abstract': 'The Data Rods Explorer (DRE) is a web client app that enables users to browse several NASA-hosted data sets. The interface enables visualization and download of NASA observation retrievals and land surface model (LSM) outputs by variable, space and time. The key variables are precipitation, wind, temperature, surface downward radiation flux, heat flux, humidity, soil moisture, groundwater, runoff, and evapotranspiration. These variables describe the main components of the water cycle over land masses.\n' +
                        '\n',
                    'keywords': 'LSM, Land Surface Model, NASA',
                    'app_home_page_url': {'value': 'https://apps.hydroshare.org/apps/data-rods-explorer/'},
                    'version': null,
                    'views': 1183,
                    'date_created': 'Dec 07, 2017 at 3:38 p.m.',
                    'date_last_updated': 'Dec 07, 2017 at 3:46 p.m.',
                    'supported_resource_types_string': null,
                    'aggregationTypes': null,
                    'supported_file_extensions': null,
                    'helpUrl': null,
                    'mailUrl': null,
                    'issueUrl': null,
                    'citation': 'Espinoza, G. E., D. Arctur, UT Austin (2017). Data Rods Explorer App, HydroShare, http://www.hydroshare.org/resource/9e860803f84940358a4dd0e563a96572',
                    'app_icon': {'value':"https://apps.hydroshare.org/static/data_rods_explorer/images/DataRodsExplorer_icon.png"}
                },
                {
                    'name': 'OPeNDAP (Hyrax)',
                    'resourceUrl': 'https://www.hydroshare.org/resource/f5c46b72d49b4019972716a82355f7bd/',
                    'isCommunityApp': true,
                    'creator': 'David Tarboton',
                    'creator_url': '/user/13',
                    'url_base_aggregation':{'value': 'http://hyrax.hydroshare.org/opendap/${HS_RES_ID}/data/contents/'},
                    'abstract': 'This is the web app connector for the OPeNDAP service for content aggregations within Composite resources in HydroShare. The OPeNDAP service is available only for the "Public" composite resources. Due to current Hyrax deployment limitations this does not work for large NetCDF files. Exact upper limit unknown, but has been tested up to 200 MB successfully.',
                    'keywords': 'OPeNDAP, Multidimensional Space-time Data, NetCDF',
                    'app_home_page_url':{'value': 'http://hyrax.hydroshare.org/opendap/hyrax'},
                    'version': null,
                    'views': 2121,
                    'date_created': 'Feb 27, 2018 at 6:40 p.m.',
                    'date_last_updated': 'Apr 07, 2021 at 6:24 p.m.',
                    'supported_resource_types_string': 'Composite Resource',
                    'aggregationTypes': 'Multidimensional Content: A multidimensional dataset represented by a NetCDF file (.nc) and text file giving its NetCDF header content',
                    'supported_file_extensions':{'value': '.nc'},
                    'helpUrl': null,
                    'mailUrl': null,
                    'issueUrl': null,
                    'citation': 'Tarboton, D. (2021). OPeNDAP (Hyrax), HydroShare, http://www.hydroshare.org/resource/f5c46b72d49b4019972716a82355f7bd',
                    'app_icon': {'value': 'https://pbs.twimg.com/profile_images/1003722775058702336/t8-nftfg_400x400.jpg'}
                },
                {
                    'name': 'GRACE Data Viewer',
                    'resourceUrl': 'https://www.hydroshare.org/resource/7bccb6b1ffac46e389802e90d4fa2c42/',
                    'isCommunityApp': false,
                    'creator': 'Norm Jones',
                    'creator_url': '/user/1001',
                    'url_base_aggregation': {'value': 'https://tethys.byu.edu/apps/newgrace/'},
                    'abstract': 'Since 2002, NASA’s GRACE Satellite mission has allowed scientists of various disciplines to analyze and map the changes in Earth’s total water storage on a global scale. Although the raw data is available to the public, the process of viewing, manipulating, and analyzing the GRACE data can be tedious and difficult for those without strong technological backgrounds in programming or other related fields. The GRACE web app helps bridge the technical gap for decision makers by providing a user interface to visualize (in both map and time series format), not only the data collected from the GRACE mission, but the individual components of water storage as well. Using the GLDAS Land Surface model, the application allows the user to isolate and identify the changes in surface water and groundwater storage that makeup the total water storage quantities measured by the raw GRACE data. The application also includes the capability to upload a custom shapefile in order to perform a regional analysis of these changes allowing decision makers to aggregate and analyze the change in groundwater, surface water, and total water storage within their own personal regions of interest',
                    'keywords': 'NASA, GRACE, Groundwater',
                    'app_home_page_url':{'value': 'https://tethys.byu.edu/apps/newgrace/'},
                    'version': {'value':'2.0'},
                    'views': 801,
                    'date_created': 'Aug 02, 2018 at 7:50 p.m.',
                    'date_last_updated': 'Aug 15, 2018 at 8:56 p.m.',
                    'supported_resource_types_string': null,
                    'aggregationTypes': null,
                    'supported_file_extensions': null,
                    'helpUrl': null,
                    'mailUrl': null,
                    'issueUrl': null,
                    'citation': 'McStraw, T. C., S. Pulla, S. Evans, N. Jones, D. Ames, J. Nelson (2018). GRACE Data Viewer, HydroShare, http://www.hydroshare.org/resource/7bccb6b1ffac46e389802e90d4fa2c42',
                    'app_icon': {'value': "https://www.hydroshare.org/resource/7da3501f2de2461b9a8c4e593400d019/data/contents/nbviewer.JPG"
                          }
                },
                {
                    'name': 'SWATShare',
                    'resourceUrl': 'https://www.hydroshare.org/resource/3fb11de2432e46aaacd70499fd680e6d/',
                    'isCommunityApp': false,
                    'creator': 'I Luk Kim',
                    'creator_url': '/user/1001',
                    'url_base_aggregation': {'value':'https://mygeohub.org/groups/water-hub/swatshare?source=hs&res_id=${HS_RES_ID}'},
                    'abstract': 'SWATShare Web App for exploring HydroShare resource',
                    'keywords': 'SWATShare',
                    'app_home_page_url': {'value': 'https://mygeohub.org/groups/water-hub/swatshare_landing'},
                    'version': null,
                    'views': 1168,
                    'date_created': 'Apr 14, 2016 at 3:03 a.m.',
                    'date_last_updated': 'Apr 17, 2020 at 4:16 p.m.',
                    'supported_resource_types_string': 'SWAT Model Instance Resource',
                    'aggregationTypes': null,
                    'supported_file_extensions': null,
                    'helpUrl': null,
                    'mailUrl': null,
                    'issueUrl': null,
                    'citation': 'Kim, I. L. (2020). SWATShare, HydroShare, http://www.hydroshare.org/resource/3fb11de2432e46aaacd70499fd680e6d',
                    'app_icon': {'value':"https://mygeohub.org/groups/water-hub/File:1449835642_magnifier.png" }
                },
                {
                    'name': 'CJW-k8s-test-js-169-80',
                    'resourceUrl': 'https://www.hydroshare.org/resource/a0f43586759e462e9956a2e0361fc887/',
                    'isCommunityApp': false,
                    'creator': 'Zhiyu (Drew) Li',
                    'creator_url': '/user/1001',
                    'url_base_aggregation':{'value': 'http://js-169-80.jetstream-cloud.org/hub/spawn?next=/user-redirect/hs-pull?id=${HS_RES_ID}%26subfolder%3DDownloads'},
                    'abstract': 'CJW K8s test\n' +
                        'http://js-169-80.jetstream-cloud.org/',
                    'keywords': 'k8s, cjw',
                    'app_home_page_url': {'value': 'http://js-169-80.jetstream-cloud.org'},
                    'version': null,
                    'views': 57,
                    'date_created': 'Feb 13, 2021 at 5:33 p.m.\n',
                    'date_last_updated': 'Mar 09, 2021 at 11:01 p.m.',
                    'supported_resource_types_string': null,
                    'aggregationTypes': null,
                    'supported_file_extensions': {'value':'.ipynb'},
                    'helpUrl': null,
                    'mailUrl': null,
                    'issueUrl': null,
                    'citation': 'Li, Z. (. (2021). CJW-k8s-test-js-169-80, HydroShare, http://www.hydroshare.org/resource/a0f43586759e462e9956a2e0361fc887',
                    'app_icon': {'value':""}
                },
                {
                    'name': 'THREDDS',
                    'resourceUrl': 'https://www.hydroshare.org/resource/70070fa1b382496e85ca44894683b15d/',
                    'isCommunityApp': true,
                    'creator': 'Anthony M. Castronova',
                    'creator_url': '/user/1001',
                    'url_base_aggregation':{'value': 'https://thredds.hydroshare.org/thredds/catalog/hydroshare/resources/${HS_RES_ID}/data/contents/catalog.html'},
                    'abstract': 'This is the web app connector for the HydroShare THREDDS (Thematic Real-time Environmental Distributed Data Services) server for content aggregations within Composite resources in HydroShare. The THREDDS service is available only for the "Public" composite resources. This THREDDS server supports access to netCDF data through OPeNDAP using the DAP2 protcol. This connects to a CUAHSI deployment of the UCAR Unidata THREDDS server https://www.unidata.ucar.edu/software/tds/current/TDS.html.',
                    'keywords': 'Multidimensional Space-time Data, THREDDS, NetCDF, OPeNDAP',
                    'app_home_page_url': {'value': 'http://thredds.hydroshare.org'},
                    'version': null,
                    'views': 68,
                    'date_created': 'Mar 31, 2021 at 2:31 p.m.',
                    'date_last_updated': 'Apr 09, 2021 at 11:28 p.m.',
                    'supported_resource_types_string': 'Composite Resource',
                    'aggregationTypes': 'Multidimensional Content: A multidimensional dataset represented by a NetCDF file (.nc) and text file giving its NetCDF header content',
                    'supported_file_extensions': {'value':'.nc'},
                    'helpUrl': null,
                    'mailUrl': null,
                    'issueUrl': null,
                    'citation': 'Tarboton, D., C. Calloway (2021). THREDDS, HydroShare, http://www.hydroshare.org/resource/70070fa1b382496e85ca44894683b15d',
                    'app_icon': {'value':"https://unidata.ucar.edu/images/logos/badges/badge_tds_100.jpg"}
                },
                {
                    'name': 'CyberGIS-Jupyter for Water',
                    'resourceUrl': 'https://www.hydroshare.org/resource/4cfd280e8eb747169b293aec2862d4f5/',
                    'isCommunityApp': true,
                    'creator_url': '/user/1001',
                    'creator': 'Shaowen Wang ',
                    'url_base_aggregation': {'value':'https://go.illinois.edu/cybergis-jupyter-water/hub/spawn?next=/user-redirect/hs-pull?id=${HS_RES_ID}%26subfolder%3DDownloads'},
                    'abstract': 'The CyberGIS-Jupyter for Water (CJW) platform aims to advance community hydrologic modelling, and support data-intensive, reproducible, and computationally scalable water science research by simplifying access to advanced cyberGIS and cyberinfrastructure capabilities through a friendly Jupyter Notebook environment. The current release has specific support for the Structure For Unifying Multiple Modeling Alternatives (SUMMA) model and the WRFHydro model.\n' +
                        '\n' +
                        'You may open and view any notebook (*.ipynb file) with this app.\n' +
                        '\n' +
                        'Please send comments and bug reports to help@cybergis.org.',
                    'keywords': 'jupyter, cybergis, alpha, water\n',
                    'app_home_page_url': {'value':'https://go.illinois.edu/cybergis-jupyter-water/'},
                    'version': {'value':'beta'},
                    'views': 1056,
                    'date_created': 'Oct 21, 2019 at 1:19 p.m.',
                    'date_last_updated': 'Feb 17, 2021 at 8:20 p.m.',
                    'supported_resource_types_string': 'Geographic Feature (ESRI Shapefiles), Geographic Raster, Generic, Multidimensional (NetCDF), SWAT Model Instance Resource, HIS Referenced Time Series, Time Series, Script Resource, Model Program Resource, Model Instance Resource, Collection Resource, MODFLOW Model Instance Resource, Composite Resource',
                    'aggregationTypes': 'Multidimensional Content: A multidimensional dataset represented by a NetCDF file (.nc) and text file giving its NetCDF header content, Referenced Time Series Content: A reference to one or more time series served from HydroServers outside of HydroShare in WaterML format, Time Series Content: One or more time series held in an ODM2 format SQLite file and optional source comma separated (.csv) files, Single File Content: A single file with file specific metadata, Geographic Raster Content: A geographic grid represented by a virtual raster tile (.vrt) file and one or more geotiff (.tif) files, Geographic Feature Content: The multiple files that are part of a geographic shapefile, File Set Content: One or more files with specific metadata',
                    'supported_file_extensions': {'value':'.ipynb'},
                    'helpUrl': false,
                    'mailUrl': false,
                    'issueUrl': null,
                    'citation': 'Li, Z. (., F. Lu, A. Padmanabhan, S. Wang (2021). CyberGIS-Jupyter for Water, HydroShare, http://www.hydroshare.org/resource/4cfd280e8eb747169b293aec2862d4f5',
                    'app_icon': {'value':'https://pbs.twimg.com/profile_images/1003722775058702336/t8-nftfg_400x400.jpg'}
                }
                /*
                    'name':->'title',
                    'short_id':'short_id'
                    'creator':'creators'['order'= 1]['name'], # loop through order
                    'creator_url': ,
                    ;resourceUrl':,
                    'appLaunchingResourceUrlPattern':'url_base_aggregation'['value'],
                    'appLaunchingFileUrlPattern':'url_base_file'['value'],
                    'abstract':'description',
                    'keywords':for subject in  'subjects': subject['value'],
                    'app_home_page_url':'app_home_page_url'['value'],
                    'version':'version',
                    'views':,              !!!!!Non Dublin Core
                    'date_created':'dates'[0]['start_date'], #need to verify that 'dates'[0]['type']='created' #Not Always true
                    'date_last_updated':'date_last_updated.split("T")[0], #need to verify that 'dates'[1]['type']='modified' #Not Always true
                    'supported_resource_types_string':'supported_resource_types'['supported_res_types'],
                    'aggregationTypes':supported_aggregation_types[supported_agg_types']['description'],
                    'supported_file_extensions':'supported_file_extensions'['value'],
                    'helpUrl':'help_page_url',
                    'mailUrl':'mailing_list_url',
                    'issueUrl':'issues_page_url',
                    'citation':,               !!!!!Non Dublin Core
                    'icon':'app_icon',

                    to add:
                    'contributors':
                    'funding_agencies':
                    'identifiers': -> resource Id or link to web app connector
                    'rights':
                    'relations': -> Can be Used for Demo Resource
                    'url_base':??????
                    'testing_protocol_url':
                    'roadmap':
                */
                /* Dublin Core Metadata
                    'title':
                    'app owner':
                    'creators':
                    'contributors':
                    'created_date':
                    'last_modified':
                    'description':
                    'funding_agencies':
                    'resource_id': #not Dublin Core but is required to get
                    'Copyrights':
                    'sources':
                    'subjects': # aka keywords
                    'relations':
                    'url_base':
                    'url_base_aggregation':
                    'url_base_file':
                    'version':
                    'supported_resource_types':
                    'supported_aggregation_types':
                    'app_icon':
                    'supported_file_extensions':
                    'app_home_page_url':
                    'mailing_list_url':
                    'testing_protocol_url':
                    'help_page_url':
                    'source_code_url':
                    'issues_page_url':
                 */
            ]
                          }
            />
        </div>
    );
}

export default App;
