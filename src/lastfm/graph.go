package lastfm

import (
	"sync"
)

const DEPTH = 3

type ArtistWithWeight struct {
    Artist *Artist
    Weight int
}

func makeAsyncCall(client *ClientLastFM, name string, artists *[]*Artist, current_names *[]string, future_names *[]string) {
	artist := client.getArtist(name)
	*artists = append(*artists, artist)
	for _, relation := range artist.Relations {
		for _, existing := range *artists {
			if relation.Name == existing.Name {
				return
			}
		}

		for _, existing := range *current_names {
			if relation.Name == existing {
				return
			}
		}

		for _, existing := range *future_names {
			if relation.Name == existing {
				return
			}
		}
		*future_names = append(*future_names, relation.Name)
	}

}

func GetArtistsFor(start string) *[]*Artist {
    var wg sync.WaitGroup
	client := newClient(APIKEY, APISECRET)
	artists := make([]*Artist, 0)

	names := []string{start}
	for i := 0; i < DEPTH; i++ {
		new_names := make([]string, 0)
		wg.Add(len(names))
		for _, name := range names {
			go func(name string) {
        		defer wg.Done()
				makeAsyncCall(client, name, &artists, &names, &new_names)
			}(name)
		}
		wg.Wait()
		names = new_names
	}
	return &artists
}

func CalculateRelationsFor(name string) *[]*ArtistWithWeight {
	artists := GetArtistsFor(name)
	weightedArtists := make(map[string]*ArtistWithWeight)
	for _, artist := range *artists {
		weightedArtists[artist.Name] = &ArtistWithWeight{
			artist,
			0,
		}
	}
	for _, artist := range *artists {
		for _, relation := range artist.Relations {
			thatArtist := weightedArtists[relation.Name]
			if thatArtist != nil {
				thatArtist.Weight += relation.Weight
			}
		}
	}

	result := make([]*ArtistWithWeight, 0)
    for _, value := range weightedArtists {
        result = append(result, value)
    }

    return &result
}
