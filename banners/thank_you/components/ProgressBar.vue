<template>
	<div class="wmde-b-progress" :style="{ '--wmde-b-progress-width': '100%' }">
		<div class="wmde-b-progress-fill">
			<p>{{ thankYouContent[ 'mini-progress-bar-text' ] }}</p>
			<div class="wmde-b-progress-icon">
				<svg viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="0" y="0" width="170" height="170"/>
					<path d="M80.154,94.091L70.563,84.5L67.32,87.743L80.154,100.6L107.754,73L104.511,69.734L80.154,94.091Z" style="fill:white;"/>
					<path d="M86.054,0L86.054,16.5" style="stroke:rgb(51,102,204); stroke-width:3px;"/>
					<path d="M85.054,141.5L85.054,158" style="stroke:rgb(51,102,204); stroke-width:3px;"/>
					<path d="M138.031,21.524L126.363,33.191" style="stroke:rgb(51,102,204); stroke-width:3px;"/>
					<path d="M44.749,124.802L33.082,136.469" style="stroke:rgb(51,102,204); stroke-width:3px;"/>
					<path d="M137.031,136.469L125.363,124.801" style="stroke:rgb(51,102,204); stroke-width:3px;"/>
					<path d="M45.749,33.191L34.082,21.524" style="stroke:rgb(51,102,204); stroke-width:3px;"/>
					<path d="M158.562,85.5L142.062,85.5" style="stroke:rgb(51,102,204); stroke-width:3px;"/>
				</svg>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { ThankYouContent } from '@src/domain/EditableContent/ThankYouContent';

interface Props {
	thankYouContent: ThankYouContent;
}

defineProps<Props>();

</script>
