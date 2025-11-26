<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg!
				Kein Konzern oder Milliardär finanziert Wikipedia, sondern eine gemeinnützige Organisation.
				Am heutigen {{ currentDayName }}, den {{ currentDate }}, bitten wir Sie daher, die Unabhängigkeit von Wikipedia zu unterstützen.
				{{ campaignDaySentence }}
				<AnimatedText :content="visitorsVsDonorsSentence"/>
				Die meisten Menschen spenden, weil sie Wikipedia nützlich finden.
				Die durchschnittliche Spende beträgt {{ averageDonation }}, doch bereits 5&nbsp;€ helfen uns weiter.
				Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
				Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück.
				Vielen Dank!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';

const {
	currentDayName,
	currentDate,
	averageDonation,
	campaignDaySentence,
	visitorsVsDonorsSentence
} = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
