/**
 * @flow
 * @relayHash cedf4d1bd19cf34b28595da0b968848d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type spaceArtistsQueryVariables = {|
  name?: ?string
|};
export type spaceArtistsQueryResponse = {|
  +artists: ?$ReadOnlyArray<?{|
    +name: ?string,
    +weight: ?string,
    +url: ?string,
    +image: ?string,
    +relations: ?$ReadOnlyArray<?string>,
  |}>
|};
export type spaceArtistsQuery = {|
  variables: spaceArtistsQueryVariables,
  response: spaceArtistsQueryResponse,
|};
*/


/*
query spaceArtistsQuery(
  $name: String
) {
  artists(name: $name) {
    name
    weight
    url
    image
    relations
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "name",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "artists",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name",
        "type": "String"
      }
    ],
    "concreteType": "Artist",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "weight",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "url",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "image",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "relations",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "spaceArtistsQuery",
  "id": null,
  "text": "query spaceArtistsQuery(\n  $name: String\n) {\n  artists(name: $name) {\n    name\n    weight\n    url\n    image\n    relations\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "spaceArtistsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "spaceArtistsQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9a4b0b06fa7a0f3fd1649bbe6b68f762';
module.exports = node;
