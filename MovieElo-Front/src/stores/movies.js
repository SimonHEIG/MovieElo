import { ref, watchEffect } from "vue";

const apiURL = import.meta.env.VITE_MOVIE_ELO_API_URL;

export const movies = ref(null);

watchEffect(() => {
    console.log(movies.value)
})

async function getMoviesFromAPI(cursor = "") {
    let moviesAPI = [];

    let res = await fetch(`${apiURL}${cursor}`);
    let data = await res.json();
    // console.log(data);

    moviesAPI = data.results.forEach((movie) => {
        let nom = "";
        if (movie.properties["Nom français"].rich_text.length != 0) {
            nom = movie.properties["Nom français"].rich_text[0].plain_text;
        } else {
            console.log(movie);
            nom = movie.properties.Name.title[0].plain_text;
        }

        let commentaire = "";
        if (movie.properties.Commentaire.rich_text.length != 0) {
            commentaire = movie.properties.Commentaire.rich_text[0].plain_text;
        }

        let genres = "";
        for (let i = 0; i < movie.properties.Genre.multi_select.length; i++) {
            genres += movie.properties.Genre.multi_select[i].name;
            if (i != movie.properties.Genre.multi_select.length - 1) {
                genres += ", ";
            }
        }

        // console.log(nom, movie.cover);
        let cover = "";
        if (movie.cover) {
            cover = movie.cover.external.url;
        }

        let movieData = {
            properties: {
                id: movie.id,
                name: nom,
                cast: movie.properties.Cast.rich_text[0].plain_text,
                director: movie.properties.Director.rich_text[0].plain_text,
                year: movie.properties.Year.rich_text[0].plain_text,
                genres: genres,
                cover: cover,
                img: movie.properties["IMG"].files[0].name.replace("/original/", "/w342/"),
            },
            grades: {
                acting: movie.properties.Acting.number,
                perso: movie.properties["Appréciation perso."].number,
                elo: movie.properties.Elo.number,
                feeling: movie.properties["Feeling à la fin du film"].number,
                story: movie.properties.Histoire.number,
                music: movie.properties.Musique.number,
                grade: parseInt(movie.properties.Note.formula.number * 100),
                directing: movie.properties["Réalisation"].number,
                tmdb: movie.properties["TMDB Rating"].number,
                comment: commentaire,
            },
        };
        if (!movies.value) movies.value = [];
        movies.value.push(movieData);
    });
    if (data.has_more) {
        getMoviesFromAPI(`?cursor=${data.next_cursor}`);
    }
    //   movies.value = moviesAPI
    // console.log(movies.value);
}

getMoviesFromAPI();
