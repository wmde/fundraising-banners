<template>

	<KeenSliderSlide :is-current="currentSlide === 0" class="wmde-banner-slide-content-with-progress-bar">
		<p>Unser Spendenziel: {{ goalDonationSum }} Millionen €</p>
		<ProgressBar amount-to-show-on-right="TARGET"/>
		<p class="wmde-banner-slide-reasons-to-donate-sentence">Falls Sie zögern,
			<a
				id="reasons-to-donate-link"
				class="wmde-banner-reasons-to-donate-link t-reasons-to-donate-link"
				@click.prevent="$emit( 'showReasonsToDonate' )"
				href="#"
			>
				hier sind 10 gute Gründe
			</a>
			für eine Spende.</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 1">
		<p><strong>Hi,</strong></p>
		<p>
			vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am
			heutigen {{ currentDayName }}, den {{ liveDateAndTime.currentDate }}, um {{ liveDateAndTime.currentTime }} bitten wir Sie,
			die Unabhängigkeit von Wikipedia zu unterstützen.
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			{{ campaignDaySentence }}
			<AnimatedText :content="visitorsVsDonorsSentence"/>
			Die meisten Menschen spenden, weil sie Wikipedia nützlich finden.
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			Die durchschnittliche Spende beträgt {{ averageDonation }}, doch bereits 10&nbsp;€ helfen uns weiter. Hat Wikipedia
			Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 4">
		<p>
			Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück.
			Falls Sie zögern,
			<button class="wmde-banner-reasons-to-donate-link" @click.prevent="$emit( 'showReasonsToDonate' )">
				hier sind 10 gute Gründe
			</button>
			für eine Spende.
			<strong> Vielen Dank!</strong>
		</p>
	</KeenSliderSlide>

</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted, watch } from 'vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';

interface Props {
	playLiveText: boolean;
	currentSlide: number
}

const props = defineProps<Props>();
defineEmits( [ 'showReasonsToDonate' ] );

const {
	currentDayName,
	getCurrentDateAndTime,
	goalDonationSum,
	visitorsVsDonorsSentence,
	campaignDaySentence,
	averageDonation
}: DynamicContent = inject( 'dynamicCampaignText' );

const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );

watch( () => props.playLiveText, ( shouldPlay: boolean ) => {
	if ( !shouldPlay ) {
		stopTimer();
	}
} );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
