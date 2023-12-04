<template>
	<!-- eslint-disable max-len -->
	<div class="wmde-banner-donor-heart" :style="{ '--current-donation-fill': `-${ fillAmount }px` }">
		<div class="wmde-banner-donor-heart-text">
			<span class="wmde-banner-donor-heart-text-total">{{ donorAverageStats.currentDonorsNeeded }}</span>
			<span class="wmde-banner-donor-heart-text-label">{{ $translate( 'donor-heart-icon-label' ) }}</span>
		</div>
		<div class="wmde-banner-donor-heart-icon">
			<svg width="100%" height="100%" viewBox="0 0 72 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule: evenodd;clip-rule: evenodd;stroke-linejoin: round;stroke-miterlimit: 2;">
				<g transform="matrix(1,0,0,1,-476,-354)">
					<path d="M525.834,357.5C530.382,357.505 534.742,359.31 537.958,362.52C541.174,365.729 542.983,370.08 542.988,374.619C542.988,393.946 514.271,409.59 513.049,410.236C512.726,410.409 512.366,410.5 512,410.5C511.634,410.5 511.274,410.409 510.951,410.236C509.728,409.59 481.012,393.946 481.012,374.619C481.017,370.08 482.826,365.729 486.042,362.52C489.258,359.31 493.618,357.505 498.166,357.5C503.879,357.5 508.882,359.952 512,364.096C515.118,359.952 520.12,357.5 525.834,357.5Z" :style="{ fill: color }"/>
					<clipPath id="_donor_heart_mask">
						<path d="M525.834,357.5C530.382,357.505 534.742,359.31 537.958,362.52C541.174,365.729 542.983,370.08 542.988,374.619C542.988,393.946 514.271,409.59 513.049,410.236C512.726,410.409 512.366,410.5 512,410.5C511.634,410.5 511.274,410.409 510.951,410.236C509.728,409.59 481.012,393.946 481.012,374.619C481.017,370.08 482.826,365.729 486.042,362.52C489.258,359.31 493.618,357.505 498.166,357.5C503.879,357.5 508.882,359.952 512,364.096C515.118,359.952 520.12,357.5 525.834,357.5Z"/>
					</clipPath>
					<g clip-path="url(#_donor_heart_mask)">
						<path d="M512,405.764C506.948,402.826 485.439,389.443 485.439,374.619C485.443,371.252 486.786,368.024 489.171,365.643C491.557,363.262 494.792,361.922 498.166,361.918C503.547,361.918 508.066,364.778 509.953,369.373C510.119,369.778 510.403,370.124 510.768,370.368C511.132,370.612 511.561,370.742 512,370.742C512.439,370.742 512.868,370.612 513.232,370.368C513.597,370.124 513.881,369.778 514.047,369.373C515.934,364.77 520.452,361.918 525.834,361.918C529.208,361.922 532.443,363.262 534.828,365.643C537.214,368.024 538.557,371.252 538.561,374.619C538.561,389.421 517.047,402.823 512,405.764Z" :style="{ fill: backgroundColor }"/>
						<rect class="wmde-banner-donor-heart-fill" x="482" y="405.918" width="60" height="44" :style="{ fill: color }"/>
					</g>
				</g>
			</svg>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { DailyDonorStatsValues } from '@src/utils/DynamicContent/DailyDonorAverage';

// Because the graphic is an SVG the fill needs to be an inner element that gets transformed
// The height of the inner SVG is 44px, so we scale the transform amount based on that
const MAX_FILL_AMOUNT = 44;

interface Props {
	color?: string;
	backgroundColor?: string;
}

withDefaults( defineProps<Props>(), {
	color: '#990a00',
	backgroundColor: '#ffffff'
} );

const donorAverageStats = ref<DailyDonorStatsValues>( inject<DailyDonorStatsValues>( 'dailyDonorAverage' ) );
const fillAmount = ref<number>( Math.round( MAX_FILL_AMOUNT * donorAverageStats.value.currentDailyPercentage ) );

</script>
