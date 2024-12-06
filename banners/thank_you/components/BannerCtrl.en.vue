<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<MiniBanner
			:show-fireworks="showSuccessContent"
			:banner-state="bannerState"
			@close="onClose"
			@show-modal="onShowModal"
		>
			<template #text>
				<MiniBannerTextWin v-if="showSuccessContent" :number-of-donors="settings.numberOfDonors"/>
				<MiniBannerTextLose v-else :number-of-donors="settings.numberOfDonors"/>
			</template>

			<template #progress>
				<ProgressBar :fill-percentage="settings.progressBarPercentage"/>
			</template>

		</MiniBanner>

		<FullPageBanner @close="onHideModal">

			<template #text>
				<FullPageBannerTextWin v-if="showSuccessContent"/>
				<FullPageBannerTextLose v-else/>
			</template>

			<template #cta-title><CTATitle/></template>
			<template #benefits><MembershipBenefits/></template>

			<template #membership-buttons>
				<MembershipFormButton
					:label="$translate( 'call-to-action-button-amount-per-month', { amount: 2 } )"
					:extra-url-parameters="{
						interval: '1',
						fee: '200',
						type: 'sustaining'
					}"
					@submit="submitWithAmount"
				/>
				<MembershipFormButton
					:label="$translate( 'call-to-action-button-different-amount' )"
					:extra-url-parameters="{ type: 'sustaining' }"
					@submit="submitWithoutAmount"
				/>
			</template>

			<template #subscribe>
				<a :href="subscribeURL" @click.prevent="onSubscribe">{{ $translate( 'call-to-action-more-info' ) }}</a><br>
				<a :href="useOfFundsURL" @click.prevent="onUseOfFunds">{{ $translate( 'use-of-funds' ) }}</a>
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
import MiniBannerTextWin from '../content/win/MiniBannerText.en.vue';
import FullPageBannerTextWin from '../content/win/FullPageBannerText.en.vue';
import MiniBannerTextLose from '../content/lose/MiniBannerText.en.vue';
import FullPageBannerTextLose from '../content/lose/FullPageBannerText.en.vue';
import MembershipBenefits from '../content/MembershipBenefits.en.vue';
import ProgressBar from './ProgressBar.vue';
import { Tracker } from '@src/tracking/Tracker';
import { ThankYouModalShownEvent } from '@src/tracking/events/ThankYouModalShownEvent';
import MembershipFormButton from './MembershipButton.vue';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { ThankYouSettings } from '../settings';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import CTATitle from '@banners/thank_you/content/CTATitle.en.vue';

enum ContentStates {
	Mini = 'wmde-banner-wrapper--mini',
	Full = 'wmde-banner-wrapper--full-page'
}

interface Props {
	bannerState: BannerStates;
	settings: ThankYouSettings;
	subscribeURL: string;
	useOfFundsURL: string;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'modalOpened', 'modalClosed' ] );
const tracker = inject<Tracker>( 'tracker' );
const contentState = ref<ContentStates>( ContentStates.Mini );
const showSuccessContent = props.settings.progressBarPercentage === 100;

const onClose = (): void => {
	emit( 'bannerClosed', new CloseEvent( 'MainBanner', CloseChoices.Close ) );
};

const onShowModal = (): void => {
	tracker.trackEvent( new ThankYouModalShownEvent() );
	emit( 'modalOpened' );
	contentState.value = ContentStates.Full;
};

const onHideModal = (): void => {
	emit( 'modalClosed' );
	contentState.value = ContentStates.Mini;
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

const onUseOfFunds = (): void => {
	onSubmit( props.useOfFundsURL, 'use-of-funds' );
};

</script>
