import React from "react";

export class Line extends React.Component {
    render() {
        const [x1, y1] = this.props.start,
            [x2, y2] = this.props.end;
        return (
            <svg viewBox={`0 0 ${window.innerWidth} ${document.documentElement.scrollHeight}`} style={{
                position: "absolute",
                zIndex: this.props.level,
                top: 0,
                right: 0,
            }}>
                <line
                    x1={x1} y1={y1} 
                    x2={x2} y2={y2} 
                    stroke="#D0B0B0"
                    strokeWidth="2"
                    style={{
                        zIndex: this.props.level,
                        position: 'absolute'
                    }}
                />  
            </svg>
        );
    }
}