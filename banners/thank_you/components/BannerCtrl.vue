<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<MiniBanner
			:thank-you-content="thankYouContent"
			@close="close"
			@readMore="showModal"
		/>

		<BannerModal
			:visible="contentState === ContentStates.Full"
			:thank-you-content="thankYouContent"
			:membership-with-amount-url="membershipWithAmountURL"
			:membership-without-amount-url="membershipWithoutAmountURL"
			@close="hideModal"
			@membership-with-amount="membershipWithAmount"
			@membership-without-amount="membershipWithoutAmount"
			@dialogue-opened="dialogueOpened"
		>
			<template #subscribe>
				<a :href="subscribeURL" @click.prevent="subscribe"><small>{{ thankYouContent[ 'more-info' ] }}</small></a>
				<a :href="useOfFundsURL" @click.prevent="useOfFunds"><small>{{ thankYouContent[ 'use-of-funds' ] }}</small></a>
			</template>
		</BannerModal>
	</div>
</template>

<script setup lang="ts">

import { inject, ref } from 'vue';
import { Tracker } from '@src/tracking/Tracker';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';
import { ThankYouModalShownEvent } from '@src/tracking/events/ThankYouModalShownEvent';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import MiniBanner from '../components/MiniBanner.vue';
import BannerModal from './BannerModal.vue';
import { ThankYouModalHiddenEvent } from '@src/tracking/events/ThankYouModalHiddenEvent';
import { ThankYouContent } from '@src/domain/EditableContent/ThankYouContent';
import { ThankYouSectionExpandedEvent } from '@src/tracking/events/ThankYouSectionExpandedEvent';

enum ContentStates {
	Mini = 'wmde-banner-wrapper--mini',
	Full = 'wmde-banner-wrapper--full-page'
}

interface Props {
	thankYouContent: ThankYouContent;
	subscribeURL: string;
	useOfFundsURL: string;
	membershipWithAmountURL: string;
	membershipWithoutAmountURL: string;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'modalOpened', 'modalClosed' ] );

const tracker = inject<Tracker>( 'tracker' );
const contentState = ref<ContentStates>( ContentStates.Mini );

const close = (): void => {
	emit( 'bannerClosed', new CloseEvent( 'MainBanner', CloseChoices.Close ) );
};

const showModal = (): void => {
	tracker.trackEvent( new ThankYouModalShownEvent() );
	emit( 'modalOpened' );
	contentState.value = ContentStates.Full;
};

const hideModal = (): void => {
	tracker.trackEvent( new ThankYouModalHiddenEvent() );
	emit( 'modalClosed' );
	contentState.value = ContentStates.Mini;
};

const submit = ( url: string, userChoice: string ): void => {
	tracker.trackEvent( new BannerSubmitEvent( 'ThankYouBanner', userChoice ) );
	window.location.href = url;
};

const dialogueOpened = ( dialogueName: string ): void => {
	tracker.trackEvent( new ThankYouSectionExpandedEvent( dialogueName ) );
};

const membershipWithAmount = (): void => {
	submit( props.membershipWithAmountURL, 'with-amount-5' );
};

const membershipWithoutAmount = (): void => {
	submit( props.membershipWithoutAmountURL, 'without-amount' );
};

const subscribe = (): void => {
	submit( props.subscribeURL, 'subscribe' );
};

const useOfFunds = (): void => {
	submit( props.useOfFundsURL, 'use-of-funds' );
};

</script>
