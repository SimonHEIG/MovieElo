import { ref } from 'vue'

const apiURL = import.meta.env.VITE_MOVIE_ELO_API_URL

export const movies = ref([
  {
    properties: {
      name: 'loading...',
      cast: 'Acteur 1, Acteur 2, Acteur 3, Acteur 4, ...',
      director: 'Réalisateur',
      year: 'Année',
      genres: 'Genre 1, Genre 2, Genre 3 ...',
      cover: ''
    },
    grades: {
      acting: '0',
      perso: 0,
      elo: 0,
      feeling: 0,
      story: 0,
      music: 0,
      note: 0,
      directing: 0,
      tmdb: 0,
      comment: 'commentaire'
    }
  },
  {
    properties: {
      name: 'loading...',
      cast: 'Acteur 1, Acteur 2, Acteur 3, Acteur 4, ...',
      director: 'Réalisateur',
      year: 'Année',
      genres: 'Genre 1, Genre 2, Genre 3 ...',
      cover: ''
    },
    grades: {
      acting: '0',
      perso: 0,
      elo: 0,
      feeling: 0,
      story: 0,
      music: 0,
      note: 0,
      directing: 0,
      tmdb: 0,
      comment: 'commentaire'
    }
  }])

async function getMoviesFromAPI() {
  let moviesAPI = [];

  let res = await fetch(`${apiURL}`)
  let data = await res.json()
  // console.log(data);

  moviesAPI = data.results.map(movie => {

    let nom = ''
    if (movie.properties['Nom français'].rich_text.length != 0) {
      nom = movie.properties['Nom français'].rich_text[0].plain_text
    } else {
      nom = movie.properties.Name.title[0].plain_text
    }

    let commentaire = ''
    if (movie.properties.Commentaire.rich_text.length != 0) {
      commentaire = movie.properties.Commentaire.rich_text[0].plain_text
    }

    let genres = ''
    for (let i = 0; i < movie.properties.Genre.multi_select.length; i++) {
      genres += movie.properties.Genre.multi_select[i].name
      if (i != movie.properties.Genre.multi_select.length - 1) {
        genres += ', '
      }
    }

    let movieData = {
      properties: {
        id: movie.id,
        name: nom,
        cast: movie.properties.Cast.rich_text[0].plain_text,
        director: movie.properties.Director.rich_text[0].plain_text,
        year: movie.properties.Year.rich_text[0].plain_text,
        genres: genres,
        cover: movie.cover.external.url,
        img: movie.properties['IMG'].files[0].name.replace('/original/', '/w342/'),
      },
      grades: {
        acting: movie.properties.Acting.number,
        perso: movie.properties['Appréciation perso.'].number,
        elo: Math.trunc(movie.properties.Elo.number),
        feeling: movie.properties['Feeling à la fin du film'].number,
        story: movie.properties.Histoire.number,
        music: movie.properties.Musique.number,
        grade: parseInt(movie.properties.Note.formula.number * 100),
        directing: movie.properties['Réalisation'].number,
        tmdb: movie.properties['TMDB Rating'].number,
        comment: commentaire
      }
    }
    return movieData
  })
  if (data.has_more) {
    getMoviesFromAPI()
  }
  movies.value = moviesAPI
  // console.log(movies.value);
}

getMoviesFromAPI()