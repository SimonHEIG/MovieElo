<script setup>
import TheMovieProperties from './TheMovieProperties.vue';
import TheMovieGrades from './TheMovieGrades.vue';
import { ref, watchEffect } from '@vue/runtime-core';
import { movies } from '../../stores/movies';
const props = defineProps({
    movieId: String,
    rank: Number
})
const emit = defineEmits(['click', 'close'])

let movieData = ref(movies.value[0])

watchEffect(() => {
    if (props.movieId != null) {
        movieData.value = movies.value.filter(obj => {
            return obj.properties.id == props.movieId
        })[0]
    }
})

</script>

<template>
    <div id="close">
        <span class="material-symbols-outlined btn" @click="$emit('close')">
            close
        </span>
    </div>
    <div class="modal-header">
        <img :src="movieData.properties.cover" alt="Movie cover" />
    </div>
    <div class="modal-body">
        <h2>{{ movieData.properties.name }}</h2>
        <TheMovieGrades
            :gradesData="movieData.grades"
            :rank="props.rank"
        ></TheMovieGrades>
        <TheMovieProperties
            :propertiesdata="movieData.properties"
        ></TheMovieProperties>
    </div>
</template>

<style scoped>
.modal-header img {
    width: 100%;
    height: 250px;
    object-fit: cover;
}
#close {
    display: flex;
    justify-content: left;
    padding: 0.6rem;
}
span.btn {
    width: fit-content;
    cursor: pointer;
}
.modal-body {
    padding: 0 2rem;
}
h2 {
    text-align: left;
}

@media screen and (max-width: 767px) {
    #close {
        padding: 0;
        justify-content: right;
    }
    #close span {
        padding: 0.6rem;
        font-size: xx-large;
    }
}
</style>
