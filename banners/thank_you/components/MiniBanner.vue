<template>
	<div class="wmde-b-mini">

		<div class="wmde-c-wrapper">
			<CloseButton :hide-label="true" :thank-you-content="thankYouContent" @click="$emit( 'close' )"/>

			<div class="wmde-c-flow">
				<div class="wmde-b-mini-content">
					<h2 class="wmde-b-animated-letters">
						<span
							v-for="( character, index ) in thankYouContent[ 'mini-thank-you' ].split( '' )"
							:key="index"
							:style="{ '--index': index + 1 }"
						>
							{{ character }}
						</span>
					</h2>
					<p>{{ thankYouContent[ 'mini-message' ] }}</p>
				</div>

				<ProgressBar :fill-percentage="progressBarFillPercentage" :show-success-content="showSuccessContent"/>

				<div class="wmde-b-mini-cta">
					<button class="wmde-b-button" @click="$emit( 'read-more' )">
						{{ thankYouContent[ 'mini-button' ] }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import CloseButton from './CloseButton.vue';
import ProgressBar from './ProgressBar.vue';
import { ThankYouContent } from '@src/domain/EditableContent/ThankYouContent';

interface Props {
	progressBarFillPercentage: number;
	showSuccessContent: boolean;
	thankYouContent: ThankYouContent;
}

defineProps<Props>();
defineEmits( [ 'close', 'read-more' ] );
</script>
