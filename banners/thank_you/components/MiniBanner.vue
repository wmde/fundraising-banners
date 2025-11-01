<template>
	<div class="wmde-b-mini">

		<div class="wmde-c-wrapper">
			<CloseButton :hide-label="true" @click="$emit( 'close' )"/>

			<div class="wmde-c-flow">
				<div class="wmde-b-mini-content">
					<slot name="text"/>
				</div>
				<ProgressBar :fill-percentage="progressBarFillPercentage" :show-success-content="showSuccessContent"/>

				<div class="wmde-b-mini-cta">
					<button class="wmde-b-button" @click="$emit( 'read-more' )">
						{{ $translate( 'mini-read-more-button' ) }}
					</button>
				</div>
			</div>
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
