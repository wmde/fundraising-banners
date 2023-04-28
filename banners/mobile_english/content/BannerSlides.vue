<template>
	<KeenSlider :interval="5000" :with-navigation="false" :play="play">
		<template #slides-1>
			<div class="wmde-banner-slide-content-with-progress-bar">
				<p><strong>Our donation target: {{ goalDonationSum }} million</strong></p>
				<ProgressBar amount-to-show-on-right="TARGET"/>
			</div>
		</template>
		<template #slides-2>
			<div>
				<p><strong>To all our readers in Germany: </strong></p>
				<p>This {{ currentDayName }} your support is requested by the nonprofit that collects donations on
					Wikipedia to support free knowledge.</p>
			</div>
		</template>
		<template #slides-3>
			<div>
				<p>Each year, thanks to the 1% of readers who give to support our nonprofit mission, we can expand the
					reach of free knowledge to new corners of the world.</p>
			</div>
		</template>
		<template #slides-4>
			<div>
				<p><span class="wmde-banner-text-animated-highlight">If Wikipedia matters and is useful to you too, please join them and donate €5 today.</span>
					Give only what you can comfortably give: what matters is your support, not the size of your gift.
				</p>
			</div>
		</template>
		<template #slides-5>
			<div>
				<p>Online, Wikipedia is the closest thing we have to a public park or a library where everyone can go to
					learn. And that's priceless. Thank you.
				</p>
				<div>
					<i> — Wikimedia Fördergesellschaft</i>
				</div>
			</div>
		</template>
	</KeenSlider>
</template>

<script setup lang="ts">
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';

interface Props {
	play: boolean
}

defineProps<Props>();

const {
	currentDayName,
	goalDonationSum
}: DynamicContent = inject( 'dynamicCampaignText' );
</script>
