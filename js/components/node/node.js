import React from "react";
import _ from "lodash";

export class Node extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(nextProps.elem, this.props.elem)
    }

    render() {
        let { name, url, image, weight } = this.props.elem;
        return (
            <a href={url} ref={this.props.refCallback}>
                <div style={{
                    backgroundImage: `url(${image})`,
                    width: 20 * weight,
                    height: 20 * weight,
                    borderRadius: 20 * weight,
                    display: "inline-block"
                }}>
                    <p>{name}</p>
                </div>
            </a>
        );
    }
}