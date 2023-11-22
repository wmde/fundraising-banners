<template>
	<div class="wmde-banner-slider-pagination">
		<button
			v-for="index in slideCount" :key="index"
			:class="[ 'wmde-banner-slider-pagination-dot', { 'is-active': currentSlide === index - 1 } ]"
			@click="() => $emit( 'go-to-slide', index - 1 )"
		/>
	</div>
</template>

<script setup lang="ts">

interface Props {
	slideCount?: number;
	currentSlide: number;
}

withDefaults( defineProps<Props>(), {
	slideCount: 0
} );

defineEmits( [ 'go-to-slide' ] );
</script>
