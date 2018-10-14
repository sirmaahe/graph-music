package graphql

import (
	"github.com/graphql-go/graphql"
	"lastfm"
)

var Schema graphql.Schema

func init() {
	queryType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"artists": &graphql.Field{
				Type: graphql.NewList(artistType),
                Args: graphql.FieldConfigArgument{
                    "name": &graphql.ArgumentConfig{
                        Type: graphql.String,
                    },
                },
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					name, _ := p.Args["name"].(string)
					return lastfm.CalculateRelationsFor(name), nil
				},
			},
		},
	})
	var err error
	Schema, err = graphql.NewSchema(graphql.SchemaConfig{
		Query: queryType,
	})
	if err != nil {
		panic(err)
	}
}
