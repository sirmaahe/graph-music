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
      <div>
        <form onSubmit={(e) => {e.preventDefault(); this.setState({name: e.target.firstChild.value})}}>
          <input type="text" placeholder="band name"/>
          <input type="submit" value="graph this"/>
        </form>
        { this.state.name? <SpaceContainer name={ this.state.name }/>: ''}
      </div>
    );
  }
}