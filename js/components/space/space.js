import React from "react";
import { Node } from "../node/node.js";

export class Space extends React.Component {
  render() {
            console.log(this.props.list)
    return (
        <div>
            { this.props.list.map((elem, i) => <Node key={i} elem={elem}/>) }
        </div>
    );
  }
}