<template>
	<div class="wmde-banner-mini">
		<CloseButton :label="$translate( 'close' )" @click="$emit( 'close' )"/>
		<div class="wmde-banner-mini-content">
			<slot name="text"/>
		</div>
		<ProgressBar :fill-percentage="progressBarFillPercentage" :show-success-content="showSuccessContent"/>

		<div class="wmde-banner-mini-actions">
			<button class="wmde-banner-mini-read-more" @click="$emit( 'read-more' )">
				{{ $translate( 'mini-read-more-button' ) }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import CloseButton from './CloseButton.vue';
import ProgressBar from './ProgressBar.vue';

interface Props {
	progressBarFillPercentage: number;
	showSuccessContent: boolean;
}

defineProps<Props>();
defineEmits( [ 'close', 'read-more' ] );
</script>
