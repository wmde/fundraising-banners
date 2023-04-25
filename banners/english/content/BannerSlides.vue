<template>
	<KeenSlider :interval="5000" :with-navigation="true" :play="play">
		<template #slides-1><div>
			<p class="headline">
				<InfoIcon fill="#990a00"/> <strong> An alle, die Wikipedia in Deutschland nutzen </strong>
			</p>
			<p>
				This {{ currentDayName }} {{ currentDate }}, with only a few days before 2022 comes to an end, we
				humbly ask for your support. We are the nonprofit that collects donations on Wikipedia to
				support free knowledge. If you can, please join the 1% of readers who give.
			</p>
		</div>
		</template>
		<template #slides-2>
			<div>
				<p><span class="wmde-banner-text-animated-highlight">If everyone reading this right now
					gave just €5, we'd hit our annual goal in a couple of hours.</span> The price of a cup of
					coffee is all we ask. It's easy to ignore our messages, but we hope you'll take one minute to
					think about how useful Wikipedia is in your life.
				</p>
			</div>
		</template>
		<template #slides-3>
			<div>
				<p>Online, Wikipedia is the closest thing we have to a public park or a library where everyone can
					go to learn. If Wikipedia has given you €5 worth of knowledge this year, please support the
					technology that makes our projects possible and advance the cause of free knowledge
					worldwide. — <i>Wikimedia Fördergesellschaft</i>
				</p>
			</div>
		</template>
	</KeenSlider>
</template>

<script setup lang="ts">
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';

interface Props {
	play: boolean
}

defineProps<Props>();

const { currentDayName, currentDate }: DynamicContent = inject( 'dynamicCampaignText' );
</script>
