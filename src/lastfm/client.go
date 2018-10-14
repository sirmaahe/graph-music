package lastfm

import (
    "github.com/shkh/lastfm-go/lastfm"
)

const RELATIONS = 3

type ClientLastFM struct {
    api *lastfm.Api
}

type SimilarArtist struct{
    name string
    weight int
}

type Artist struct {
    mbid string
    name string
    year string
    image string
    url string
    relations [RELATIONS]SimilarArtist
}

func newClient(key, secret string) (*ClientLastFM) {
    api := lastfm.New(key, secret)
    client := &ClientLastFM{
        api: api,
    }
    return client
}

func (client *ClientLastFM) getArtist(name string) *Artist {
    rawArtist, err := client.api.Artist.GetInfo(lastfm.P{"artist": name, "autocorrect": 1})
    if err != nil {
        panic(err)
    }

    var relations [RELATIONS]SimilarArtist
    for index, similar := range rawArtist.Similars[:3]{
        relations[index] = SimilarArtist{
            name: similar.Name,
            weight: RELATIONS - index,
        }
    }
    return &Artist{
        mbid: rawArtist.Mbid,
        name: rawArtist.Name,
        year: rawArtist.Bio.YearFormed,
        image: rawArtist.Images[0].Url,
        url: rawArtist.Url,
        relations: relations,
    }
}
