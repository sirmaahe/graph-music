package lastfm

import (
	"sync"
)

const DEPTH = 3

type ArtistWithWeight struct {
    Artist *Artist
    weight int
}

func makeAsyncCall(client *ClientLastFM, name string, artists *[]*Artist, current_names *[]string, future_names *[]string) {
	artist := client.getArtist(name)
	*artists = append(*artists, artist)
	for _, relation := range artist.relations {
		for _, existing := range *artists {
			if relation.name == existing.name {
				return
			}
		}

		for _, existing := range *current_names {
			if relation.name == existing {
				return
			}
		}

		for _, existing := range *future_names {
			if relation.name == existing {
				return
			}
		}
		*future_names = append(*future_names, relation.name)
	}

}

func getArtistsFor(start string) *[]*Artist {
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

func calculateRelationsFor(name string) *[]*ArtistWithWeight {
	artists := getArtistsFor(name)
	weightedArtists := make(map[string]*ArtistWithWeight)
	for _, artist := range *artists {
		weightedArtists[artist.name] = &ArtistWithWeight{
			Artist: artist,
			weight: 0,
		}
	}
	for _, artist := range *artists {
		for _, relation := range artist.relations {
			thatArtist := weightedArtists[relation.name]
			if thatArtist != nil {
				thatArtist.weight += relation.weight
			}
		}
	}

	result := make([]*ArtistWithWeight, 0)
    for _, value := range weightedArtists {
        result = append(result, value)
    }

    return &result
}
