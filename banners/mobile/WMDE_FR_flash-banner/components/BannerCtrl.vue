<template>
	<div class="wmde-b-main">
		<CloseButton/>
		<header class="wmde-b-header wmde-c-flow">
			<WikiLogo/>
			<ProgressBar/>
		</header>

		<KeenSlider :play="slideshowShouldPlay" :interval="7000">
			<template #slides>
				<div class="keen-slider__slide wmde-b-slider__slide">
					aljkdajklsdmalsjknjansd
				</div>
				<div class="keen-slider__slide wmde-b-slider__slide">
					aljkdajklsdmalsjknjansd
				</div>
			</template>
		</KeenSlider>

		<FundsModal
			:content="useOfFundsContent"
			:visible="isFundsModalVisible"
			@hide="onHideFundsModal"
			@callToAction="onFundsModalCallToAction"
		/>
	</div>

</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { LocalCloseTracker } from '@src/utils/LocalCloseTracker';
import { computed, inject, ref } from 'vue';
import { Tracker } from '@src/tracking/Tracker';
import { useFormModel } from '@src/components/composables/useFormModel';
import { Translator } from '@src/Translator';
import { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import FormItemsBuilder from '@src/utils/FormItemsBuilder/FormItemsBuilder';
import { TrackingFeatureName } from '@src/tracking/TrackingEvent';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { BannerSubmitOnReturnEvent } from '@src/tracking/events/BannerSubmitOnReturnEvent';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import CloseButton from './CloseButton.vue';
import WikiLogo from './WikiLogo.vue';
import ProgressBar from './ProgressBar.vue';
import KeenSlider from './KeenSlider.vue';

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
	pageScroller: PageScroller;
	localCloseTracker: LocalCloseTracker;
}

const props = defineProps<Props>();

const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged', 'modalOpened', 'modalClosed' ] );

const tracker = inject<Tracker>( 'tracker' );

const isFundsModalVisible = ref<boolean>( false );
const slideShowStopped = ref<boolean>( false );
const slideshowShouldPlay = computed( () => props.bannerState === BannerStates.Visible && !slideShowStopped.value );
const formModel = useFormModel();

const localTranslator = inject<Translator>( 'translator' );
const currencyFormatter = inject<Currency>( 'currencyFormatter' );

const localFormItemsBuilder = new FormItemsBuilder( localTranslator, currencyFormatter.euroAmount.bind( currencyFormatter ) );

function onClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
	emit( 'modalClosed' );
}

const onSubmit = (): void => {
	const closeChoice = props.localCloseTracker.getItem();
	if ( closeChoice !== '' ) {
		tracker.trackEvent( new BannerSubmitOnReturnEvent( closeChoice ) );
	}
};

const onHideFundsModal = (): void => {
	isFundsModalVisible.value = false;
	emit( 'modalClosed' );
};

const onShowFundsModal = ( feature: TrackingFeatureName ): void => {
	isFundsModalVisible.value = true;
	tracker.trackEvent( new UseOfFundsShownEvent( feature ) );
	emit( 'modalOpened' );
};

const onFundsModalCallToAction = (): void => {
	isFundsModalVisible.value = false;

	props.pageScroller.scrollIntoView( '.wmde-banner-form' );
};
</script>
<script setup lang="ts">
</script>