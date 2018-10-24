import React from "react";
import { Node } from "../node/node.js";

export class Space extends React.Component {
    constructor(props) {
        super(props)
        let relations = props.list.map(elem => elem.relations.map(
            relation => [elem.name, relation]
        )).flat(1)
        relations = [
            ...new Set(relations)
        ]
        this.state = {
            relations,
            coordinates: {}
        }
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
                            coordinates[elem.name] = [rect.x + rect.height / 2, rect.y + rect.height / 2]
                            this.setState({coordinates: coordinates})
                        }} elem={elem} />)
                    }
                <svg viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`} style={{
                    position: "absolute",
                    zIndex: "1",
                    top: 0,
                    right: 0,
                }}>
                {
                    this.state.relations.map(relation => {
                        const [startName, endName] = relation
                        if (!this.state.coordinates[startName] || !this.state.coordinates[endName]) {
                            return
                        }
                        const [start, end] = [this.state.coordinates[startName], this.state.coordinates[endName]]
                        return <line key={`${startName}${endName}`} x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} stroke="black" />                   
                    })
                }
                </svg>
            </div>
        );
    }
}