<template>
	<div class="wmde-banner-progress-bar" :style="{ '--wmde-banner-progress-bar-width': `${fillPercentage}%` }">
		<div class="wmde-banner-progress-bar-fill">
			<div class="wmde-banner-progress-bar-fill-text">{{ $translate( translationKey ) }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">

interface Props {
	fillPercentage: number;
}

const props = defineProps<Props>();
const translationKey = props.fillPercentage < 100 ? 'progress-bar-inner-text-lose' : 'progress-bar-inner-text-win';

</script>
