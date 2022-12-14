<script setup>
import { movies } from "../stores/movies";
import { computed, ref } from "vue";
import TheMovieModal from "./modal/TheMovieModal.vue";

const ranking = computed(() => {
    return movies.value.sort((movie1, movie2) => {
        if (movie1.grades.elo > movie2.grades.elo) return -1
        if (movie1.grades.elo == movie2.grades.elo) return 0
        if (movie1.grades.elo < movie2.grades.elo) return 1
    })
})

let showModal = ref(false)
let movieId = ref(null)

function openModal(id) {
    movieId.value = id
    showModal.value = true
}

</script>
    
<template>
    <div>
        <transition name="fade" appear>
            <div
                class="modal-background"
                v-if="showModal"
                @click="showModal = false"
                :movieId="movieId"
            ></div>
        </transition>

        <transition name="pop" appear>
            <div class="modal-overlay" role="dialog" v-show="showModal">
                <TheMovieModal
                    @close="showModal = false"
                    :movieId="movieId"
                ></TheMovieModal>
            </div>
        </transition>

        <transition name="pop" appear> </transition>
    </div>
    <div class="ranking">
        <h2>The ranking</h2>
        <ul id="example-1">
            <li id="first-row">
                <span class="rank">#</span>
                <span class="name">Film</span>
                <span class="elo">Elo</span>
            </li>
            <li
                v-for="(movie, rank) of ranking"
                class="movies"
                @click="openModal(movie.properties.id)"
            >
                <span class="rank">{{ rank + 1 }}.</span>
                <span class="name">{{ movie.properties.name }}</span>
                <span class="elo">{{ Math.round(movie.grades.elo) }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
    width: 60%;
    align-content: center;
    margin: auto;
}

li {
    border-bottom: #830f14 solid 1px;
    display: flex;
    padding: 0 0.5rem;
}
li.movies:hover {
    background-color: #e4ddd1;
    cursor: pointer;
}
#first-row {
    font-weight: bold;
}
.rank {
    flex-basis: 35px;
}
.name {
    flex-grow: 1;
}
.modal-background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #00000073;
}
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 66%;
    display: flex;
    flex-direction: column;
    padding: 0;
    background-color: #fcf5e8;
    z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
    transition: transform 0.3s ease
}

.pop-enter-from,
.pop-leave-to {
    transform: translateX(100%);
}
</style>
    