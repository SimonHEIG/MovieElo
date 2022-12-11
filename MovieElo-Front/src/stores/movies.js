import { ref } from 'vue'

const apiURL = import.meta.env.VITE_MOVIE_ELO_API_URL

export const movies = ref([{name: "loading...", elo: 0}, {name: "loading...", elo: 0}])

async function getMoviesFromAPI() {
  let moviesAPI = [];
  
  let res = await fetch(`${apiURL}`)
  let data = await res.json()

  moviesAPI = data.results.map(movie => {
    let nom = ''
    if(movie.properties['Nom français'].rich_text.length != 0){
      nom = movie.properties['Nom français'].rich_text[0].plain_text
    }else{
      nom = movie.properties.Name.title[0].plain_text
    }
    return {
      name: nom,
      elo: movie.properties.Elo.number,
      img: movie.properties['IMG'].files[0].name.replace('/original/', '/w342/'),
      cover: movie.cover.external.url
    }
  })
  if (data.has_more) {
    getMoviesFromAPI()
  }
  movies.value = moviesAPI
}

getMoviesFromAPI()