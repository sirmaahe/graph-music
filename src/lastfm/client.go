package lastfm

import (
	"github.com/shkh/lastfm-go/lastfm"
)

const RELATIONS = 4

type ClientLastFM struct {
	api *lastfm.Api
}

type SimilarArtist struct {
	Name   string
	Weight int
}

type Artist struct {
	Mbid      string
	Name      string
	Year      string
	Image     string
	Url       string
	Relations [RELATIONS]SimilarArtist
}

func newClient(key, secret string) *ClientLastFM {
	api := lastfm.New(key, secret)
	client := &ClientLastFM{
		api: api,
	}
	return client
}

func (client *ClientLastFM) getArtist(name string) *Artist {
	rawArtist, err := client.api.Artist.GetInfo(lastfm.P{"artist": name, "autocorrect": 1})
	if err != nil {
		return nil
	}

	var relations [RELATIONS]SimilarArtist
	for index, similar := range rawArtist.Similars[:RELATIONS] {
		relations[index] = SimilarArtist{
			Name:   similar.Name,
			Weight: RELATIONS - index,
		}
	}
	return &Artist{
		Mbid:      rawArtist.Mbid,
		Name:      rawArtist.Name,
		Year:      rawArtist.Bio.YearFormed,
		Image:     rawArtist.Images[len(rawArtist.Images)-1].Url,
		Url:       rawArtist.Url,
		Relations: relations,
	}
}
