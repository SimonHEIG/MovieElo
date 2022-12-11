<script setup>
import MovieVote from './MovieVote.vue'
import { movies } from '../stores/movies';
import { ref, watchEffect } from 'vue';

let movie1 = ref()
let movie2 = ref()

watchEffect(() => {
    if (movies.value[0].name != 'loading') {
        newDuel()
    }
})

function newDuel() {
    let shuffled = [...movies.value].sort(() => 0.5 - Math.random())
    shuffled = shuffled.slice(0, 2)

    movie1.value = movies.value.find((movie) => movie.name == shuffled[0].name)
    movie2.value = movies.value.find((movie) => movie.name == shuffled[1].name)
}


function calculateNewElos(score1, score2) {

    const movie1_expected_score = 1 / (1 + Math.pow(10, ((movie2.value.elo - movie1.value.elo) / 400)))
    const movie2_expected_score = 1 / (1 + Math.pow(10, ((movie1.value.elo - movie2.value.elo) / 400)))
    movie1.value.elo += 20 * (score1 - movie1_expected_score)
    movie2.value.elo += 20 * (score2 - movie2_expected_score)

    newDuel()
}

newDuel()
</script>

<template>
    <h2>The vote</h2>
    <div class="cards">
        <MovieVote
            :name="movie1.name"
            :img="movie1.img"
            @vote="calculateNewElos(1, 0)"
        ></MovieVote>
        <h1>VS</h1>
        <MovieVote
            :name="movie2.name"
            :img="movie2.img"
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
}

</style>
