<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p>
			Am heutigen {{ currentDayName }}, den {{ currentDate }}, können Sie mit einem kleinen Beitrag die
			Unabhängigkeit von Wikipedia verteidigen.<AnimatedText content="Millionen Menschen nutzen Wikipedia,
			aber 99 % spenden nicht."/>
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			Dabei steht Wikipedia unter Druck: Desinformation und Manipulation überschwemmen das Internet. Deshalb ist
			es gerade in diesen Zeiten wichtig, Wikipedia zu schützen.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Heute kommt es auch auf Sie an – denn Wikipedia ist ein Gemeinschaftswerk: Je mehr sich beteiligen, desto
			besser. Die durchschnittliche Spende beträgt 22,89 €, doch bereits 5&nbsp;€ helfen uns weiter.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann stärken Sie uns mit
			einer Spende Ihrer Wahl. Sie helfen damit mehr, als Sie vielleicht denken. Vielen Dank!
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const {
	currentDayName,
	currentDate
} = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
