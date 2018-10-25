import React from 'react';
import {SpaceContainer} from "../container/space/space";


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  render() {
    return (
      <div style={{
        minHeight: window.innerHeight,
        backgroundColor: "#202020",
        color: "#DFDFDF",
        paddingLeft: "10%",
        paddingRight: "10%",
      }}>
        <form onSubmit={(e) => {e.preventDefault(); this.setState({name: e.target.firstChild.value})}}>
          <input type="text" placeholder="band name"/>
          <input type="submit" value="graph this"/>
        </form>
        { this.state.name? <SpaceContainer changeName={name => this.setState({name: name})} name={ this.state.name }/>: ''}
      </div>
    );
  }
}