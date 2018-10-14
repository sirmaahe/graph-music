package lastfm

import "sync"

var DEPTH = 2

type Relations struct {
    mbid string
    name string
    year string
    image string
    url string
    weight int
    relations []string
}

func makeAsyncCall(client *ClientLastFM, name string, artists *[]Artist, current_names *[]string, future_names *[]string) {
	artist := client.getArtist(name)
	*artists = append(*artists, *artist)

	for _, name := range artist.relations {
		for _, existing := range *artists {
			if name.name == existing.name {
				return
			}
		}

		for _, existing := range *current_names {
			if name.name == existing {
				return
			}
		}

		for _, existing := range *future_names {
			if name.name == existing {
				return
			}
		}
	}

	*future_names = append(*future_names, artist.name)
}

func getArtistsFor(start string) *[]Artist {
    var wg sync.WaitGroup
	client := newClient("", "")
	artists := make([]Artist, 16)

	names := []string{start}
	for i := 0; i < DEPTH; i++ {
		new_names := make([]string, 9)
		for _, name := range names {
			go func() {
        		defer wg.Done()
				makeAsyncCall(client, name, &artists, &names, &new_names)
			}()
		}
		wg.Wait()
		names = new_names
	}
	return &artists
}

func calculateRelationsFor(name string) {
	artists := getArtistsFor(name)

	for _, artist := range artists {
		
	}
}