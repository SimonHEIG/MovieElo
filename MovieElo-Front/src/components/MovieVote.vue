<script setup>
const props = defineProps({
    name: String,
    img: String
})
const emit = defineEmits(['click', 'vote'])

</script>

<template>
    <div class="card" @click="$emit('vote')">
        <div class="card-body">
            <img :src="props.img" class="card-img" />
            <div class="name">
                <h3>{{ name }}</h3>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    filter: drop-shadow(5px 5px 5px rgb(199, 199, 199));
    transition: all 0.1s ease-out;
    /* margin: 20px; */
    width: 250px;
    height: 450px;
}
.card:hover {
    transform: scale(1.05);
}
.card-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #f8fff8;
    border-radius: 3px;
    width: 100%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    text-align: center;
}

.card-img {
    border-radius: 3px 3px 0 0;
}
.name {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
}

h3 {
    line-height: 125%;
    font-size: medium;
    font-weight: 400;
    margin: 0 1em 0 1em;
}

@media screen and (max-width: 767px) {
    .card {
        width: 80%;
        height: 200px;
    }

    .card-img {
        height: 70%;
        object-fit: cover;
    }
}
</style>
