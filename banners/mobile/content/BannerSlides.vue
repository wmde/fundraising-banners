<template>
	<KeenSlider :interval="5000" :with-navigation="false" :start="start">
		<template #slides-1>
			<div>
				<p>Unser Spendenziel: {{ goalDonationSum }} Millionen Euro</p>
				<ProgressBar amount-to-show-on-right="TARGET"/>
			</div>
		</template>
		<template #slides-2>
			<div>
				<p>An alle, die Wikipedia in Deutschland nutzen:<br/>
					Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg!
					Am heutigen {{ currentDayName }} bitten wir Sie bescheiden, die Unabhängigkeit von Wikipedia
					zu sichern.</p>
			</div>
		</template>
		<template #slides-3>
			<div>
				<p>{{ campaignDaySentence }} Insgesamt spenden 99% nichts – sie übergehen diesen Aufruf. Wikipedia
					wird durch Spenden von durchschnittlich 22,66&nbsp;€ finanziert.</p>
			</div>
		</template>
		<template #slides-4>
			<div>
				<p>Doch schon mit einer Spende von 5&nbsp;€ kann Wikipedia sich auch in Zukunft erfolgreich
					entwickeln. <span v-if="visitorsVsDonorsSentence !== ''" class="wmde-banner-text-animated-highlight">{{ visitorsVsDonorsSentence }}</span></p>
			</div>
		</template>
		<template #slides-5>
			<div>
				<p>Die meisten Menschen spenden, weil sie Wikipedia nützlich finden. Hat Wikipedia Ihnen in
					diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? <strong>Dann nehmen Sie sich doch bitte
						eine Minute Zeit und geben Sie etwas zurück. Vielen Dank!</strong></p>
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
	start: boolean
}

defineProps<Props>();

const {
	currentDayName,
	campaignDaySentence,
	visitorsVsDonorsSentence,
	goalDonationSum
}: DynamicContent = inject( 'dynamicCampaignText' );
</script>
