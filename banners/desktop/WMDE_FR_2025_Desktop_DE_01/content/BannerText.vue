<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am heutigen
				{{ currentDayName }}, den {{ currentDate }}, bitten wir Sie, die Unabhängigkeit von Wikipedia zu unterstützen.
				<AnimatedText content="Millionen Menschen nutzen Wikipedia, aber 99&nbsp;% spenden nicht – sie übergehen diesen Aufruf."/>
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
	averageDonation
} = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
