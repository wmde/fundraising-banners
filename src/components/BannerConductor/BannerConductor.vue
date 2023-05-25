<template>
	<div ref="bannerRef" class="wmde-banner" :class="bannerState.stateName">
		<slot
			name="banner"
			:banner-state="bannerState.stateName"
			:banner-closed="onClosed"
			:banner-content-changed="onContentChanged"
		/>
	</div>
</template>

<script setup lang="ts">

import { Page } from '@src/page/Page';
import { inject, nextTick, onMounted, ref } from 'vue';
import { BannerConfig } from '@src/domain/BannerConfig';
import { ResizeHandler } from '@src/utils/ResizeHandler';
import { newStateFactory } from '@src/components/BannerConductor/StateMachine/states/StateFactory';
import { newBannerStateMachine } from '@src/components/BannerConductor/StateMachine/BannerStateMachine';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { Vector2 } from '@src/utils/Vector2';
import { ImpressionCount } from '@src/utils/ImpressionCount';
import { Tracker } from '@src/tracking/Tracker';
import { TrackingFeatureName } from '@src/tracking/TrackingEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';

interface Props {
	page: Page;
	bannerConfig: BannerConfig;
	resizeHandler: ResizeHandler;
	impressionCount: ImpressionCount;
}

const props = defineProps<Props>();
const tracker = inject<Tracker>( 'tracker' );

const bannerRef = ref( null );
const stateFactory = newStateFactory( props.bannerConfig, props.page, tracker, props.resizeHandler, props.impressionCount );
const bannerState = ref<BannerState>( stateFactory.newInitialState() );
const stateMachine = newBannerStateMachine( bannerState );

onMounted( async () => {
	await stateMachine.changeState( stateFactory.newPendingState( bannerRef.value.offsetHeight ) );
	const bannerNotShownReason = props.page.getReasonToNotShowBanner( new Vector2( bannerRef.value.offsetWidth, bannerRef.value.offsetHeight ) );

	if ( bannerNotShownReason ) {
		await stateMachine.changeState( stateFactory.newNotShownState( bannerNotShownReason, bannerRef.value.offsetHeight ) );
	} else {
		await stateMachine.changeState( stateFactory.newShowingState() );
		await stateMachine.changeState( stateFactory.newVisibleState() );
	}
} );

props.resizeHandler.onResize( () => stateMachine.currentState.value.onResize( bannerRef.value.offsetHeight ) );
props.page.onPageEventThatShouldHideBanner( () => stateMachine.changeState( stateFactory.newClosedState( new CloseEvent( 'Page', 'page-interaction' ) ) ) );

const onContentChanged = (): void => {
	// Wait a tick in order to let the content re-render before updating the size
	nextTick( () => {
		stateMachine.currentState.value.onContentChanged( bannerRef.value.offsetHeight );
	} );
};

const onClosed = async ( feature: TrackingFeatureName, userChoice: CloseChoices ): Promise<any> => {
	await stateMachine.changeState( stateFactory.newClosedState( new CloseEvent( feature, userChoice ) ) );
};

</script>

<style lang="scss">
/* stylelint-disable selector-id-pattern */
#wmde-banner-app,
#WMDE-Banner-Container {
	position: fixed;
	width: 100%;
	z-index: 1000;
}
.wmde-banner-closed {
	display: none;
}
</style>
