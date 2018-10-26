import React from "react";
import _ from "lodash";
import { Node } from "../node/node.js";
import { Line } from "../line/line.js";

export class Space extends React.Component {
    constructor(props) {
        super(props)
        let relations = props.list.map(elem => elem.relations.map(
            relation => [elem.name, relation]
        )).flat(1)
        relations = [
            ...new Set(relations)
        ]
        const randoms = props.list.reduce((result, item, index, array) => {
            result[item.name] = [Math.random(), Math.random(), Math.random(), Math.random()]
            return result
          }, {})
        this.state = {
            relations,
            randoms,
            coordinates: {},
            active: ''
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.forceUpdate())
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.forceUpdate())
    }

    render() {
        return (
            <div>
                {
                    this.props.list.map(
                        (elem, i) => <Node key={i} refCallback={e => {
                                if (!e) {
                                    return
                                }
                                let coordinates = this.state.coordinates
                                const rect = e.getBoundingClientRect()                       
                                coordinates[elem.name] = [
                                    rect.left + rect.width / 2 + window.scrollX, 
                                    rect.top + rect.height / 2 + window.scrollY
                                ]
                                this.setState({coordinates: coordinates})
                            }} 
                            changeName={this.props.changeName} elem={elem} 
                            setActive={name => this.setState({active: name})}
                            randoms={this.state.randoms[elem.name]}
                            active={
                                this.state.active == elem.name 
                                || this.state.relations.some(
                                    relation => this.state.active 
                                        && relation.includes(this.state.active) 
                                        && relation.includes(elem.name)
                                    )
                            }
                        />)
                    }

                <div style={{
                    position: "absolute",
                    zIndex: "3",
                    top: 0,
                    right: 0,
                    display: this.state.active? "block": "none",
                    backgroundColor: "#202020",
                    opacity: "0.8",
                    minWidth: window.innerWidth,
                    minHeight: document.documentElement.scrollHeight
                }}></div>
                
                {
                    this.state.relations.map((relation, i) => {
                        const [startName, endName] = relation
                        if (!this.state.coordinates[startName] || !this.state.coordinates[endName]) {
                            return
                        }
                        const [start, end] = [this.state.coordinates[startName], this.state.coordinates[endName]],
                            active = [startName, endName].includes(this.state.active);
                        return <Line 
                            key={i} 
                            level={active? '4': '1'}
                            start={start}
                            end={end}
                        />
                    })
                }
            </div>
        );
    }
}