<template>
	<FallbackBanner v-bind="props" @banner-closed="onClose">
		<template #slides="{ currentSlide }: any">
			<FallbackSlides :current-slide="currentSlide"/>
		</template>
		<template #message>
			<FallbackText>
			</FallbackText>
		</template>
	</FallbackBanner>
</template>

<script setup lang="ts">

import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import FallbackBanner from '@src/components/FallbackBanner/FallbackBanner.vue';
import FallbackSlides from '../content/FallbackSlides.vue';
import FallbackText from '../content/FallbackText.vue';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
	donationLink: string;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed' ] );

function onClose(): void {
	emit( 'bannerClosed', new CloseEvent( 'FallbackBanner', CloseChoices.Close ) );
}
</script>
