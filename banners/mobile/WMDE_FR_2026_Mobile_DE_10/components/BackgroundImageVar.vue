<template>
	<figure
		class="wmde-b-background-image"
		:class="{ 'wmde-b-background-image--visible': visible }"
		:style="`--image: url( ${image} )`"
		aria-hidden="true"
	>
		<figcaption>{{ credit }}</figcaption>
	</figure>
</template>

<script setup lang="ts">

interface Props {
	image: string;
	visible: boolean;
	credit: string;
}

defineProps<Props>();
</script>
