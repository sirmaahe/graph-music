import React from "react";
import _ from "lodash";

export class Node extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(nextProps.elem, this.props.elem) || !_.isEqual(nextProps.active, this.props.active)
    }

    componentDidMount() {
        window.addEventListener('resize', this.forceUpdate())
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.forceUpdate())
    }

    getMargin(baseMargin, random) {
        return baseMargin + 40 * random
    }

    render() {
        const { name, url, image, weight, relations } = this.props.elem,
            [top, right, down, left] = this.props.randoms;
        const active = this.props.active,
            baseMargin = 5 * weight
        return (
            <div style={{
                backgroundImage: `url(${image})`,
                width: 20 * weight,
                height: 20 * weight,
                borderRadius: 20 * weight,
                display: "inline-block",
                margin: `${this.getMargin(baseMargin, top)}px 
                    ${this.getMargin(baseMargin, right)}px 
                    ${this.getMargin(baseMargin, down)}px 
                    ${this.getMargin(baseMargin, down)}px`,
                position: "relative",
                zIndex: active ? "5" : "2",
                cursor: "pointer",
                boxShadow: "0px 5px 11px 1px rgba(0,0,0,0.5)",
                backgroundSize: "contain"
            }}
                ref={this.props.refCallback}
                onClick={e => this.props.changeName(name)}
                onMouseEnter={e => this.props.setActive(name)}
                onMouseLeave={e => this.props.setActive('')}
            >
                <p style={{
                    textShadow: "0px 2px 2px black"
                }}>{name}</p>
                <a href={url} style={{
                    color: "#EFEFEF",
                    textShadow: "0px 2px 2px black",
                    textDecoration: "unset"
                }}>more>></a>
            </div>
        );
    }
}