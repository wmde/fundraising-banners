<template>
	<div class="wmde-b-progress" :style="{ '--wmde-b-progress-width': `${fillPercentage}%` }">
		<div class="wmde-b-progress-fill">
			<p>{{ thankYouContent[ 'mini-progress-bar-text' ] }}</p>
			<div class="wmde-b-progress-icon wmde-banner-confetti-container">
				<svg viewBox="0 0 41 31" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M12.834 24.357L3.243 14.766L0 18.009L12.834 30.866L40.434 3.266L37.191 0L12.834 24.357Z" style="fill: var( --progress-fill-icon-content );"/>
				</svg>
				<div class="wmde-b-confetti">
					<span style="--index: 1;"/>
					<span style="--index: 2;"/>
					<span style="--index: 3;"/>
					<span style="--index: 4;"/>
					<span style="--index: 5;"/>
					<span style="--index: 6;"/>
					<span style="--index: 7;"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { ThankYouContent } from '@src/domain/EditableContent/ThankYouContent';

interface Props {
	fillPercentage: number;
	thankYouContent: ThankYouContent;
}

defineProps<Props>();

</script>
