<script setup>
import { movies } from "../stores/movies";
import { computed, ref } from "vue";
const ranking = computed(() => {
    return movies.value.sort((movie1, movie2) => {
        // console.log(movie1.elo);
        if (movie1.elo > movie2.elo) return -1
        if (movie1.elo == movie2.elo) return 0
        if (movie1.elo < movie2.elo) return 1
    })
})

</script>
    
<template>
    <div class="ranking">
        <h2>The ranking</h2>
        <ul id="example-1">
            <li id="first-row">
                <span class="rank">#</span>
                <span class="name">Film</span>
                <span class="elo">Elo</span>
            </li>
            <li v-for="(movie, rank) of ranking" class="movies">
                <span class="rank">{{ rank + 1 }}.</span>
                <span class="name">{{ movie.name }}</span>
                <span class="elo">{{ Math.round(movie.elo) }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>

ul{
    list-style-type: none;
    padding: 0;
    width: 60%;
    align-content: center;
    margin: auto;
}

li{
    border-bottom: #830f14 solid 1px;
    display: flex;
    padding: 0 0.5rem;
}
li.movies:hover{
    background-color: #e4ddd1;
}
#first-row{
    font-weight: bold;
}
.rank{
    flex-basis: 35px;
}
.name{
    flex-grow: 1;
}
</style>
    