<template>
	<figure
		class="wmde-b-background-image"
		:class="{ 'wmde-b-background-image--visible': visible }"
		:style="{
			'--image': `url( ${image} )`,
			'--position': position,
			'--zoom': zoom,
			'--offset-y': offsetY,
		}"
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
	position?: string;
	zoom?: number;
	offsetY?: string;
}

withDefaults( defineProps<Props>(), {
	position: '50% 50%',
	zoom: 1,
	offsetY: '0%',
} );
</script>
