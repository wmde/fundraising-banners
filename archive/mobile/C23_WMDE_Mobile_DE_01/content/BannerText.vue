<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				<strong>An alle, die Wikipedia in Deutschland nutzen: </strong>
			</p>
			<p>
				Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am
				heutigen {{ currentDayName }} bitten wir Sie bescheiden, die Unabhängigkeit von Wikipedia zu
				unterstützen.
				<span class="wmde-banner-text-animated-highlight">
					Millionen Menschen nutzen Wikipedia, aber 99 % spenden nicht – sie übergehen diesen Aufruf.
				</span>
				Die meisten Menschen spenden, weil sie Wikipedia nützlich finden. Die durchschnittliche Spende
				beträgt 22,25&nbsp;€, doch bereits eine Spende von 5&nbsp;€ hilft uns weiter. Hat Wikipedia Ihnen in
				diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? <strong>Dann entscheiden Sie sich, eine der
				seltenen Ausnahmen zu sein, und geben Sie etwas zurück.</strong> Vielen Dank!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { currentDayName }: DynamicContent = inject( 'dynamicCampaignText' );

</script>
