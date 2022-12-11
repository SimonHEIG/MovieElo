<script setup>
const props = defineProps({
	name: String
})
const emit = defineEmits(['click', 'vote'])

</script>

<template>
	<h3>{{name}}</h3>
	<img src="http://placekitten.com/200/300" @click="$emit('vote')">
</template>

<style scoped>

</style>
