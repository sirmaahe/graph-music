package graphql

import (
    "github.com/graphql-go/graphql"
    "lastfm"
)

var artistType = graphql.NewObject(
    graphql.ObjectConfig{
        Name: "Artist",
        Fields: graphql.Fields{
            "mbid": &graphql.Field{
                Type: graphql.ID,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					a := p.Source.(*lastfm.ArtistWithWeight)
					return a.Artist.Mbid, nil
				},
            },
            "name": &graphql.Field{
               Type: graphql.String,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				    a := p.Source.(*lastfm.ArtistWithWeight)
					return a.Artist.Name, nil
				},
            },
            "year": &graphql.Field{
               Type: graphql.String,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					a := p.Source.(*lastfm.ArtistWithWeight)
					return a.Artist.Year, nil
				},
            },
            "image": &graphql.Field{
               Type: graphql.String,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					a := p.Source.(*lastfm.ArtistWithWeight)
					return a.Artist.Image, nil
				},
            },
            "url": &graphql.Field{
               Type: graphql.String,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					a := p.Source.(*lastfm.ArtistWithWeight)
					return a.Artist.Url, nil
				},
            },
            "weight": &graphql.Field{
               Type: graphql.String,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					a := p.Source.(*lastfm.ArtistWithWeight)
					return a.Weight, nil
				},
            },
            "relations": &graphql.Field{
               Type: graphql.NewList(graphql.String),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					a := p.Source.(*lastfm.ArtistWithWeight)

					newRelations := make([]string, 16)

					for i, relation := range a.Artist.Relations {
					    newRelations[i] = relation.Name
                    }
					return newRelations, nil
				},
            },
        },
    },
)
