<script setup>
import TheVote from './components/TheVote.vue'
import { movies } from './stores/movies';
import TheRanking from './components/TheRanking.vue';
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';

const routes = {
    '/Vote': TheVote,
    '/Ranking': TheRanking
}

const currentPath = ref('#/Vote')
window.location.hash = currentPath.value

window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash
})

const currentView = computed(() => {
    return routes[currentPath.value.slice(1) || '/']
})

</script>

<template>
    <header>
        <!-- <h1>MovieElo</h1> -->
        <div id="header-logo">
            <a href="#/Vote"
                ><img src="./assets/Logo_MovieElo_Red.png" alt="logo_movie_elo"
            /></a>
        </div>
        <nav>
            <a href="#/Vote">Vote</a>
            <a href="#/Ranking">Ranking</a>
            <!-- <a href="#">About</a> -->
        </nav>
    </header>

    <main>
        <component :is="currentView" />
    </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap");
html {
    font-family: "Kanit", sans-serif;
    font-weight: 400;
    background-color: #fcf5e8;
    color: #1d0204;
}

body {
    margin: 0;
}

header {
    display: flex;
    align-items: center;
    padding: 0 3rem 0 2rem;
    border-bottom: #830f14 solid 1px;
}
h1,
h2 {
    font-family: "Kanit", sans-serif;
    font-weight: 700;
    text-align: center;
    color: #830f14;
}

#header-logo {
    flex-grow: 1;
}
#header-logo img {
    height: 4rem;
    vertical-align: middle;
}
nav {
    display: flex;
    gap: 1rem;
}
header nav a{
    background-color: #830f14;
    border-radius: 5px;
    color: #fcf5e8;
    padding: 0.3rem 1.1rem;
    text-decoration: none;
    transition: all 0.1s ease-out;
}
header nav a:hover{
    transform: scale(1.05);
    color:#fcf5e8
}
a {
    color: #830f14;
}
a:hover {
    color: #faaa1e;
}
</style>
