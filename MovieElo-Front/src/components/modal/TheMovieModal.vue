<script setup>
import TheMovieProperties from './TheMovieProperties.vue';
import TheMovieGrades from './TheMovieGrades.vue';
import { ref, watchEffect } from '@vue/runtime-core';
import { movies } from '../../stores/movies';
const props = defineProps({
    movieId: String
})
const emit = defineEmits(['click', 'close'])

let movieData = ref(movies.value[0])

watchEffect(() => {
    if (props.movieId != null ){
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
        <TheMovieProperties
            :propertiesdata="movieData.properties"
        ></TheMovieProperties>
        <TheMovieGrades :gradesData="movieData.grades"></TheMovieGrades>
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
    flex-direction: column;
    justify-content: center;
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
</style>
