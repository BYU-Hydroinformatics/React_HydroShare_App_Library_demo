import './App.css';
import React from "react";

function TagsDiv(props) {
    if (!props.value) {
        return null;
    }
    let link;
    let title;
    if (props.image === 'cuahsi') {
        link = "/static/img/cuahsi_logo.png";
        title = "CUAHSI App"
    } else if (props.image === 'community') {
        link = "/static/img/communities.png";
        title = "Community App"
    } else if (props.image === 'personal') {
        link = "/static/img/personal.png";
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

function InputButton(props) {
    if ( props.refUrl.search(/\${.*}/)=== -1) {
        return null;
    }
    console.log(props.refUrl.search(/\${.*}/));
    //todo: add onClick function that opens and closes InputView
    return (
        <button onClick=""><img href="static/img/inputs" alt="Optional HydroShare inputs. Click to view."/></button>
    );

}

function InputView(props) { //todo: implement
    if (props.inputs.length <= 0 && props.showDiv) {
        return null;
    }
    const formInputs = []
    props.inputs.forEach((input) => {
        formInputs.push(
            <div className="input-grid">
                <b>{input}: </b><input name={input} value={input}/>
            </div>
        );
    });
    return (
        <div class="input-view">
           {/* <form id={props.key} onSubmit={{"openUrl("+props.key + ", " + props.url + ")"}}>  //Uncomment when begin to implement
                {formInputs}
                <input type="submit" value="Open App with inputs"/>
            </form> */}
        </div>
    )
}

function openUrl(form, url) {
    const name = document.getElementById(form).elements;
    let finalUrl = url;
    name.forEach((n) => {
        let value = name.value;
        finalUrl.replace("${" + n + "}", value)
    });
    window.open(finalUrl);
}

function App() {

    class Entry extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                expandedState: false,
                color: props.position % 2 === 0 ? 'light-theme' : 'dark-theme',
                metadata: props.metadata,
            }
            this.changeExpandedState = this.changeExpandedState.bind(this)

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
                this.setState({showInputs: false});
            } else {
                this.setState({showInputs: !this.state.showInputs});

            }
        }


        render() {
            if (this.state.expandedState) {
                return (

                    <div>
                        <div className={this.state.color + " entry expanded"}>
                            <div className='grid-1-1' scope="row">
                                <input type="image"
                                       src={this.state.metadata.icon}
                                       alt={this.state.metadata.name}
                                       width="48"
                                       height="48"/>
                            </div>
                            <div className="image-tags">
                                <TagsDiv image={'cuahsi'} value={this.state.metadata.isCuahsiApp}/>
                                <TagsDiv image={'community'} value={this.state.metadata.isCommunityApp}/>
                                <TagsDiv image={'personal'} value={this.state.metadata.isPersonalApp}/>
                            </div>
                            <div className="app-name"><h4>{this.state.metadata.name}</h4></div>
                            <div className="app-owner"><a>{this.state.metadata.owner}</a></div>
                            <div className="app-inputs">
                                <InputButton refUrl={this.state.metadata.appLaunchingResourceUrlPattern}/>
                            </div>
                            <div className="app-abstract">
                                <b>Abstract: </b>{this.state.metadata.abstract}
                            </div>
                            <div className="app-expand">
                                <button className="button-expand" onClick={this.changeExpandedState}>
                                    Close Metadata
                                </button>
                            </div>
                        </div>

                        <div className={this.state.color + ' app-grid-expanded'}>
                            <div><b>Keywords: </b>{this.state.metadata.keywords}</div>
                            <div><b>Home Page
                                URL: </b><a href={this.state.metadata.homeUrl}>{this.state.metadata.homeUrl}</a>
                            </div>
                            <div><b>Version: </b>{this.state.metadata.version}</div>
                            <div><b>Views: </b>{this.state.metadata.views}</div>
                            <div><b>Date Created: </b>{this.state.metadata.dateCreated}</div>
                            <div><b>Last Update: </b>{this.state.metadata.lastUpdateDate}</div>
                            <div><b>Supported Resource Types: </b>{this.state.metadata.supportedResourceTypes}</div>
                            <div><b>App-launching Resource Level URL
                                Pattern: </b>{this.state.metadata.appLaunchingResourceUrlPattern}
                            </div>
                            <div><b>Supported Aggregation Types: </b>{this.state.metadata.aggregationTypes}</div>
                            <div><b>Supported File Extensions: </b>{this.state.metadata.fileExtentions}</div>
                            <div><b>Source Code URL: </b><a
                                href={this.state.metadata.sourceUrl}>{this.state.metadata.sourceUrl}</a></div>
                            <div><b>Help Page URL: </b><a
                                href={this.state.metadata.helpUrl}>{this.state.metadata.helpUrl}</a></div>
                            <div><b>Mailing List URL: </b><a
                                href={this.state.metadata.Url}>{this.state.metadata.mailUrl}</a></div>
                            <div><b>Issues Page URL: </b><a
                                href={this.state.metadata.issueUrl}>{this.state.metadata.issueUrl}</a></div>
                            <div className="app-citation">
                                <b>Citation: </b> {this.state.metadata.citation}
                            </div>
                        </div>
                    </div>

                );
            } else {
                return (
                    //todo: add compressed return
                    <div className={this.state.color + " entry"}>
                        <div className='grid-1-1' scope="row">
                            <input type="image"
                                   src={this.state.metadata.icon}
                                   alt={this.state.metadata.name}
                                   width="48"
                                   height="48"/>
                        </div>
                        <div className="image-tags">
                            <TagsDiv image={'cuahsi'} value={this.state.metadata.isCuahsiApp}/>
                            <TagsDiv image={'community'} value={this.state.metadata.isCommunityApp}/>
                            <TagsDiv image={'personal'} value={this.state.metadata.isPersonalApp}/>
                        </div>
                        <div className="app-name"><h4>{this.state.metadata.name}</h4></div>
                        <div className="app-owner"><a>{this.state.metadata.owner}</a></div>
                        <div className="app-inputs">
                            <InputButton refUrl={this.state.metadata.appLaunchingResourceUrlPattern}/>
                        </div>
                        <div className="app-abstract">
                            <b>Abstract: </b>{this.state.metadata.abstract}
                        </div>
                        <div className="app-expand">
                            <button className="button-expand" onClick={this.changeExpandedState}>
                                View Metadata
                            </button>
                        </div>
                    </div>

                );
            }
        }

    }

    class Dynamic_table extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                entries: [
                    {
                        'name': 'City Water Model',
                        'owner': 'Hart Henrichsen',
                        'abstract': 'This is some code I made over the weekend. It is not done yet, but will be really cool.',
                        'isCuahsiApp': false,
                        'isCommunityApp': false,
                        'homeUrl':'http://temp' ,
                        'appLaunchingResourceUrlPattern':'http://temp',

            },
                    {
                        'name': 'Data Rods Explorer',
                        'owner': 'David E.',
                        'abstract': 'This is the data Rods explorer app. This uses NASA data',
                        'isCuahsiApp': true,
                        'isCommunityApp': false,
                        'homeUrl':'http://temp' ,
                        'appLaunchingResourceUrlPattern':'http://temp2',
                    },
                    {
                        'name': 'Snow Inspector',
                        'owner': 'Brigham Young University',
                        'isCuahsiApp': true,
                        'isCommunityApp': true,
                        'homeUrl':'http://temp' ,
                        'appLaunchingResourceUrlPattern':'http://temp/${hs_res}',
                    }
                ],
                currentUser: 'Hart Henrichsen', //todo add currentUser
            }

        }


        render() {
            const rows = [];
            let counter = 1;
            this.state.entries.forEach((currentEntry) => {
                if (true) { //todo: add if statement when add searching
                    if (currentEntry.owner === this.state.currentUser) {
                        currentEntry.isPersonalApp = true;
                    }
                    rows.push(
                        <Entry key={counter} position={counter} metadata={currentEntry}/>
                    )
                    counter += 1;
                }

            });
            return (
                <div className="library-app">
                    <h1>Table</h1>
                    <div className='table'>
                        {rows}
                    </div>
                </div>
            );
        }

    }

    return (
        <Dynamic_table></Dynamic_table>
    );
}

export default App;
