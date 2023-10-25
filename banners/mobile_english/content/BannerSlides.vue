<template>
	<KeenSliderSlide :is-current="currentSlide === 0" class="wmde-banner-slide-content-with-progress-bar">
		<p><strong>Our donation target: €{{ goalDonationSum }} million</strong></p>
		<ProgressBar amount-to-show-on-right="TARGET"/>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p><strong>&#8220;Wikipedia is not for sale.&#8221; – A personal appeal from Wikipedia-Founder Jimmy Wales</strong></p>
		<p>Please don't ignore this 1-minute read.</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			This {{ currentDayName }}, {{ currentDate }}, I ask you to reflect on the number of times you visited
			Wikipedia in the past year, the value you got from it, and whether you're able to give €5 back.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			If you can, please join the 1% of readers who give. <span class="wmde-banner-text-animated-highlight">If
			everyone reading this right now gave just €5, we'd hit our goal in a couple of hours.</span>
			It's hard to know what to trust online these days. Disinformation and scammers are everywhere.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 4">
		<p>
			We are passionate about our model because we want everyone to have equal access to quality information
			- something that is becoming harder and harder to find online. If Wikipedia has given you €5 worth
			of knowledge this year, please give back. <em>Thank you</em>.
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const {
	currentDayName,
	currentDate,
	goalDonationSum
}: DynamicContent = inject( 'dynamicCampaignText' );
</script>
