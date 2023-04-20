<template>
	<KeenSlider :interval="5000" :with-navigation="true" :play="play">
		<template #slides-1><div>
			<p class="headline">
				<InfoIcon fill="#990a00"/> <strong> An alle, die Wikipedia in Deutschland nutzen </strong>
			</p>
			<p>
				Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg!
				Am heutigen {{ currentDayName }} bitten wir Sie bescheiden, die Unabhängigkeit von Wikipedia
				zu unterstützen. {{campaignDaySentence }}</p>
		</div></template>
		<template #slides-2><div>
			<p><span class="wmde-banner-text-animated-highlight">{{ visitorsVsDonorsSentence }}</span>
				Die meisten Menschen spenden, weil sie Wikipedia nützlich finden.
				Die durchschnittliche Spende beträgt 22,66&nbsp;€, doch bereits eine Spende von 5&nbsp;€ hilft uns weiter.</p>
		</div></template>
		<template #slides-3><div>
			<p>Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann entscheiden
				Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Vielen Dank!</p>
		</div></template>
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

const { currentDayName, campaignDaySentence, visitorsVsDonorsSentence }: DynamicContent = inject( 'dynamicCampaignText' );
</script>
