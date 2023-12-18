<template>
	<div class="wmde-banner-wrapper" :class="contentState" :style="colors">
		<MiniBanner
			:progressbar-fill-percentage="progressBarFillPercentage"
			@close="onClose"
			@show-modal="onShowModal"
		>

			<template #text>
				<MiniBannerText/>
			</template>

			<template #progress>
				<ProgressBar :fill-percentage="progressBarFillPercentage"/>
			</template>

			<template #slides="{ play }: any">
				<KeenSlider :with-navigation="true" :play="play" :interval="10000" :delay="2000">

					<template #slides="{ currentSlide }: any">
						<MiniBannerSlides :currentSlide="currentSlide">
							<template #progress>
								<ProgressBar :fill-percentage="progressBarFillPercentage"/>
							</template>
						</MiniBannerSlides>
					</template>

				</KeenSlider>
			</template>

		</MiniBanner>

		<FullPageBanner @close="contentState = ContentStates.Mini">

			<template #text><FullPageBannerText/></template>

			<template #benefits><MembershipBenefits/></template>

			<template #membership-buttons>
				<MembershipFormButton
					:label="$translate( 'call-to-action-button-amount-per-month', { amount: 2 } )"
					:extra-url-parameters="{
						interval: '1',
						fee: '200'
					}"
					@submit="submitWithAmount"
				/>
				<MembershipFormButton
					class="hollow"
					:label="$translate( 'call-to-action-button-different-amount' )"
					@submit="submitWithoutAmount"
				/>
			</template>

			<template #subscribe>
				<a :href="subscribeURL" @click.prevent="onSubscribe">{{ $translate( 'call-to-action-more-info' ) }}</a>
			</template>

		</FullPageBanner>
	</div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';
import MiniBanner from './MiniBanner.vue';
import FullPageBanner from './FullPageBanner.vue';
import colors from '../styles/settings/colors';
import MiniBannerText from '../content/MiniBannerText.de.vue';
import MiniBannerSlides from '../content/MiniBannerSlides.de.vue';
import FullPageBannerText from '../content/FullPageBannerText.de.vue';
import MembershipBenefits from '../content/MembershipBenefits.de.vue';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import ProgressBar from './ProgressBar.vue';
import { Tracker } from '@src/tracking/Tracker';
import { ThankYouModalShownEvent } from '@src/tracking/events/ThankYouModalShownEvent';
import MembershipFormButton from './MembershipButton.vue';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';

enum ContentStates {
	Mini = 'wmde-banner-wrapper--mini',
	Full = 'wmde-banner-wrapper--full-page'
}

interface Props {
	progressBarFillPercentage: number;
	subscribeURL: string;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed' ] );
const tracker = inject<Tracker>( 'tracker' );
const contentState = ref<ContentStates>( ContentStates.Mini );

const onClose = (): void => {
	emit( 'bannerClosed', new CloseEvent( 'MainBanner', CloseChoices.Close ) );
};

const onShowModal = (): void => {
	tracker.trackEvent( new ThankYouModalShownEvent() );
	contentState.value = ContentStates.Full;
};

const onSubmit = ( url: string, userChoice: string ): void => {
	tracker.trackEvent( new BannerSubmitEvent( 'ThankYouBanner', userChoice ) );
	window.location.href = url;
};

const submitWithAmount = ( url: string ): void => {
	onSubmit( url, 'with-amount-2' );
};

const submitWithoutAmount = ( url: string ): void => {
	onSubmit( url, 'without-amount' );
};

const onSubscribe = (): void => {
	onSubmit( props.subscribeURL, 'subscribe' );
};

</script>
