<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				Am heutigen {{ currentDayName }}, den {{ currentDate }}, können Sie mit einem kleinen Beitrag die
				Unabhängigkeit von Wikipedia verteidigen.<AnimatedText content="Millionen Menschen nutzen Wikipedia,
				aber 99 % spenden nicht."/> Dabei steht Wikipedia unter Druck: Desinformation und Manipulation
				überschwemmen das Internet. Deshalb ist es gerade in diesen Zeiten wichtig, Wikipedia zu schützen.
				Heute kommt es auch auf Sie an – denn Wikipedia ist ein Gemeinschaftswerk: Je mehr sich beteiligen,
				desto besser. Die durchschnittliche Spende beträgt 22,89 €, doch bereits 5&nbsp;€ helfen uns weiter.
				Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann stärken Sie uns
				mit einer Spende Ihrer Wahl. Sie helfen damit mehr, als Sie vielleicht denken. Vielen Dank!
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
	currentDate
} = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
