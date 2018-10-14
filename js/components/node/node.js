import React from "react";

export class Node extends React.Component {
  render() {
    let {name, url, image, weight} = this.props.elem;
    return (
        <div style={{
            backgroundImage: `url(${image})`,
            width: 50 * weight,
            height: 50 * weight,
            borderRadius: 50 * weight
        }}>
            <a href={url}>{ name }</a>
        </div>
    );
  }
}