<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				<InfoIcon fill="#990a00"/>
				<strong> An alle, die Wikipedia in Deutschland nutzen </strong>
			</p>
			<p>
				Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am
				heutigen {{ currentDayName }}, den {{ currentDate }}, bitten wir Sie bescheiden, die Unabhängigkeit von Wikipedia zu
				unterstützen. <span class="wmde-banner-text-animated-highlight">Millionen Menschen nutzen Wikipedia,
				aber 99&nbsp;% spenden nicht – sie übergehen diesen Aufruf.</span> Die meisten Menschen spenden, weil sie
				Wikipedia nützlich finden. Die durchschnittliche Spende beträgt 22,25&nbsp;€, doch bereits 5&nbsp;€ helfen uns
				weiter. Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann entscheiden
				Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Jede Spende zählt. Vielen Dank!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';

const { currentDayName }: DynamicContent = inject( 'dynamicCampaignText' );

const currentDate = computed( () => {
	return new Intl.DateTimeFormat( 'de-DE', {
		day: '2-digit',
		month: 'long'
	} ).format( new Date() );
} );

</script>
