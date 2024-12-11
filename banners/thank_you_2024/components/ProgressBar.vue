<template>
	<div class="wmde-banner-progress-bar" :style="{ '--wmde-banner-progress-bar-width': `${fillPercentage}%` }">
		<div class="wmde-banner-progress-bar-fill">
			<div class="wmde-banner-progress-bar-fill-text">{{ $translate( translationKey ) }}</div>
			<div class="wmde-banner-progress-bar-fill-icon">
				<svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2 12L9 22L25 1" stroke-width="3" style="stroke: var( --progress-fill-icon-content );"/>
				</svg>
				<div class="confetti">
					<span class="confetti-1" style="--index: 1;"/>
					<span class="confetti-2" style="--index: 2;"/>
					<span class="confetti-3" style="--index: 3;"/>
					<span class="confetti-4" style="--index: 4;"/>
					<span class="confetti-5" style="--index: 5;"/>
					<span class="confetti-6" style="--index: 6;"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { computed } from 'vue';

interface Props {
	fillPercentage: number;
	showSuccessContent: boolean;
}

const props = defineProps<Props>();
const translationKey = computed<string>( () => props.showSuccessContent ? 'progress-bar-inner-text-win' : 'progress-bar-inner-text-lose' );

</script>
