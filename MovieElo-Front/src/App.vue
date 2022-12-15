<script setup>
import TheVote from './components/TheVote.vue'
import { movies } from './stores/movies';
import TheRanking from './components/TheRanking.vue';
import { ref } from '@vue/reactivity';
import { computed, watchEffect } from '@vue/runtime-core';

let loading = computed(() => {
    if(movies.value == null){
        return true
    }else{
        return false
    }
})

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
        <div class="loader" v-if="loading">
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <component v-else :is="currentView" />
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

body,
#app {
    margin: 0;
    height: 100vh;
    
}

#app {
    display: flex;
    flex-direction: column;
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
header nav a {
    background-color: #830f14;
    border-radius: 5px;
    color: #fcf5e8;
    padding: 0.3rem 1.1rem;
    text-decoration: none;
    transition: all 0.1s ease-out;
}
header nav a:hover {
    transform: scale(1.05);
    color:#fcf5e8
}
a {
    color: #830f14;
}
a:hover {
    color: #faaa1e;
}

main {
    flex-grow: 1;
}

/* Loader */
.loader {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lds-ring {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
}
.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 32px;
    height: 32px;
    margin: 8px;
    border: 4px solid #8a847c;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #8a847c transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}
@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}


@media screen and (max-width: 767px) {
    header{
        padding: 0 10% 0 4%
    }
}
</style>
