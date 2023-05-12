<template>
	<KeenSliderSlide :is-current="currentSlide === 0" class="wmde-banner-slide-content-with-progress-bar">
		<p><strong>Our donation target: {{ goalDonationSum }} million</strong></p>
		<ProgressBar amount-to-show-on-right="TARGET"/>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p><strong>To all our readers in Germany: </strong></p>
		<p>This {{ currentDayName }} your support is requested by the nonprofit that collects donations on
			Wikipedia to support free knowledge.</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>Each year, thanks to the 1% of readers who give to support our nonprofit mission, we can expand the
			reach of free knowledge to new corners of the world.</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p><span class="wmde-banner-text-animated-highlight">If Wikipedia matters and is useful to you too, please join them and donate €5 today.</span>
			Give only what you can comfortably give: what matters is your support, not the size of your gift.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 4">
		<p>Online, Wikipedia is the closest thing we have to a public park or a library where everyone can go to
			learn. And that's priceless. Thank you.
		</p>
		<div>
			<i> — Wikimedia Fördergesellschaft</i>
		</div>
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
	goalDonationSum
}: DynamicContent = inject( 'dynamicCampaignText' );
</script>
