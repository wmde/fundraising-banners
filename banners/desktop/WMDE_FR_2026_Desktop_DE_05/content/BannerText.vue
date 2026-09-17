<template>
	<p>
		Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg!
		Kein Konzern oder Milliardär finanziert das Projekt, sondern eine gemeinnützige Organisation.
		Am heutigen {{ currentDayName }}, den {{ currentDate }}, bitten wir Sie daher, die Unabhängigkeit von Wikipedia zu unterstützen.
		{{ campaignDaySentence }}
		<AnimatedText :is-visible="bannerState === BannerStates.Visible">Millionen Menschen nutzen Wikipedia, aber 99&nbsp;% spenden nicht – sie übergehen diesen Aufruf.</AnimatedText>
		Die meisten Menschen spenden, weil sie Wikipedia nützlich finden.
		Die durchschnittliche Spende beträgt {{ averageDonation }}, doch bereits 5&nbsp;€ helfen uns weiter.
		Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
		Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück.
		Vielen Dank!
	</p>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import AnimatedText from '@src/components/AnimatedText2026/AnimatedText.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';

interface Props {
	bannerState: BannerStates;
}

defineProps<Props>();

const {
	currentDayName,
	currentDate,
	averageDonation,
	campaignDaySentence,
} = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
