import React from "react";
import {graphql, QueryRenderer} from 'react-relay';
import {Space} from '../../components/space/space'
import environment from "../../utils";

export class SpaceContainer extends React.Component {
    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={graphql`
                    query spaceArtistsQuery ($name:String) {
                        artists(name:$name) {
                        name
                        weight
                        url
                        image
                        relations
                        }
                    }
                `}
                variables={{ name: this.props.name }}
                render={({ error, props }) => {
                    if (error) {
                        return <div>Error!</div>;
                    }
                    if (!props) {
                        return <div>Loading...</div>;
                    }
                    return <Space changeName={this.props.changeName} list={props.artists} />;
                }}
            />
        );
    }
}