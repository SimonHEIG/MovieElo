<script setup>
const props = defineProps({
    gradesData: Object
})

</script>

<template>
    <div class="grades">
        <div class="grade">
            <span class="grade-value">#{{props.gradesData.elo}}</span>
            <span class="grade-label">Movie Elo Rank</span>
        </div>
        <div class="grade">
            <span class="grade-value">{{props.gradesData.grade}}%</span>
            <span class="grade-label">Watchlist DB score</span>
        </div>
        <div class="grade">
            <span class="grade-value">{{props.gradesData.tmdb}}</span>
            <span class="grade-label">TMDB score</span>
        </div>
    </div>
</template>

<style scoped>
.grades {
    display: flex;
    justify-content: space-around;
}
.grade{
    display: flex;
    flex-direction: column;
    text-align: center;
}
.grade-value{
    font-size: xx-large;
}
.grade-label{
    color: rgb(172, 172, 172);
    font-size: small;
}
</style>
