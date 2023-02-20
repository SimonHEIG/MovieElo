<script setup>
import MovieVote from './MovieVote.vue'
import { movies } from '../stores/movies';
import { computed, ref, watchEffect } from 'vue';
import { usePatch } from '../composable/fetch.js'

let movie1 = ref(null)
let movie2 = ref(null)
let viewportWidth = ref(window.innerWidth)
addEventListener("resize", (event) => { viewportWidth.value = window.innerWidth })
let lastClick = new Date();

let movieImages = computed(() => {
    if (viewportWidth.value > 767) {
        return {
            1: movie1.value.properties.img,
            2: movie2.value.properties.img,
        }
    } else {
        return {
            1: movie1.value.properties.cover,
            2: movie2.value.properties.cover,
        }
    }
})

function newDuel() {
    let shuffled = [...movies.value].sort(() => 0.5 - Math.random())
    shuffled = shuffled.slice(0, 2)

    movie1.value = movies.value.find((movie) => movie.properties.name == shuffled[0].properties.name)
    movie2.value = movies.value.find((movie) => movie.properties.name == shuffled[1].properties.name)
}


async function calculateNewElos(score1, score2) {

    // Anti spam click
    const currentClick = new Date()
    const diff = (currentClick.getTime() - lastClick.getTime()) / 1000
    if(diff < 0.5) return
    lastClick = currentClick

    // Calcul des nouveaux elos
    const movie1_expected_score = 1 / (1 + Math.pow(10, ((movie2.value.grades.elo - movie1.value.grades.elo) / 400)))
    const movie2_expected_score = 1 / (1 + Math.pow(10, ((movie1.value.grades.elo - movie2.value.grades.elo) / 400)))
    movie1.value.grades.elo += 20 * (score1 - movie1_expected_score)
    movie2.value.grades.elo += 20 * (score2 - movie2_expected_score)

    // Ajout des elos dans la base
    usePatch({
        url: import.meta.env.VITE_MOVIE_ELO_API_URL,
        data: {
            id: movie1.value.properties.id,
            elo: movie1.value.grades.elo
        }
    });
    usePatch({
        url: import.meta.env.VITE_MOVIE_ELO_API_URL,
        data: {
            id: movie2.value.properties.id,
            elo: movie2.value.grades.elo
        }
    });

    newDuel()
}

newDuel()
</script>

<template>
    <h2>The vote</h2>
    <div class="cards">
        <MovieVote
            :name="movie1.properties.name"
            :img="movieImages[1]"
            @vote="calculateNewElos(1, 0)"
        ></MovieVote>
        <h1>VS</h1>
        <MovieVote
            :name="movie2.properties.name"
            :img="movieImages[2]"
            @vote="calculateNewElos(0, 1)"
        ></MovieVote>
    </div>
</template>

<style scoped>
.cards {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    align-items: center;
    gap: 40px;
    flex-direction: row;
}
@media screen and (max-width: 767px) {
    .cards {
        /* background-color: tomato; */
        flex-direction: column;
        gap: 5px;
    }
}
</style>
