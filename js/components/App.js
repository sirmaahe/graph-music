import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import {Space} from "./space/space";
import environment from "../utils";


export default class App extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppArtistsQuery ($name:String) {
            artists(name:$name) {
              name
              weight
              url
              image
            }
          }
        `}
        variables={{name: "slowdive"}}
        render={({error, props}) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return <Space list={ props.artists }/>;
        }}
      />
    );
  }
}