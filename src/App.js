import logo from './logo.svg';
import './App.css';
import React from "react";


function App() {

class tags_div extends React.Component{

}

class entry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            expandedState: false,
            color:props.position % 2=== 1 ? 'light-theme':'dark-theme', //may need to change props.color
            metadata: props.metadata,
        }
        this.expandedState = this.expandedState.bind(this);
        this.color = this.color.bind(this);
        this.metadata = this.metadata.bind(this);

    }

    changeExpandedState(){ //onclick method
        this.expandedState= !this.expandedState;
    }



    render() {
        if(this.expandedState){
            return(
                //todo: add expanded return
            );
        }
        else{
            return (
                //todo: add compressed return

            );
        }
    }

}

class table extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            entries:[],
        }
        this.entries = this.entries.bind(this);

    }
    render() {
        const rows=[];
        let counter = 1;
        this.entries.forEach((currentEntry)=> {
            if (true) { //todo: add if statement when add searching
                rows.push(
                    <entry position={counter} metadata={currentEntry}/>
                )
               counter += 1;
            }
        });
        return(
          <div class="app-table">
              {rows}
          </div>
        );
    }

}





}
export default App;
