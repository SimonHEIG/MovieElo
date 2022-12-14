<script setup>
import { watchEffect } from "@vue/runtime-core";

const props = defineProps({
    propertiesdata: Object
})


</script>

<template>
    <div class="properties">
        <ul>
            <li class="property">
                <span class="property-name">Réalisateur</span>
                <span class="property-value">{{
                    props.propertiesdata.director
                }}</span>
            </li>
            <li class="property">
                <span class="property-name">Acteurs</span>
                <span class="property-value">{{ props.propertiesdata.cast }}</span>
            </li>
            <li class="property">
                <span class="property-name">Année</span>
                <span class="property-value">{{ props.propertiesdata.year }}</span>
            </li>
            <li class="property">
                <span class="property-name">Genres</span>
                <span class="property-value">{{ props.propertiesdata.genres }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.properties ul {
    padding: 0;
}
.property {
    display: flex;
}
.property-name {
    flex-basis: 7rem;
    color: rgb(172, 172, 172);
    flex-shrink: 0;
}
ul.property-value {
    padding: 0;
}
</style>
