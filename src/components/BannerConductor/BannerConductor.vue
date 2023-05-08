<template>
	<div ref="bannerRef" class="wmde-banner" :class="bannerState.stateName">
		<component
			:is="banner"
			v-bind="bannerProps"
			:bannerState="bannerState.stateName"
			:bannerHeight="bannerRef?.offsetHeight"
			@banner-closed="onCloseHandler"
			@banner-content-changed="onContentChanged"
		/>
	</div>
</template>

<script setup lang="ts">

import { Page } from '@src/page/Page';
import { onMounted, ref } from 'vue';
import { BannerConfig } from '@src/BannerConfig';
import { ResizeHandler } from '@src/utils/ResizeHandler';
import { newStateFactory } from '@src/components/BannerConductor/StateMachine/states/StateFactory';
import { newBannerStateMachine } from '@src/components/BannerConductor/StateMachine/BannerStateMachine';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { CloseSources } from '@src/tracking/CloseSources';
import { Vector2 } from '@src/utils/Vector2';
import { ImpressionCount } from '@src/utils/ImpressionCount';
import { Tracker } from '@src/tracking/Tracker';

interface Props {
	page: Page,
	bannerConfig: BannerConfig,
	resizeHandler: ResizeHandler,
	banner: Object,
	bannerProps?: Object,
	impressionCount: ImpressionCount,
	tracker: Tracker
}

const props = defineProps<Props>();
const bannerRef = ref( null );
const stateFactory = newStateFactory( props.bannerConfig, props.page, props.tracker, props.resizeHandler, props.impressionCount );
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
props.page.onPageEventThatShouldHideBanner( () => stateMachine.changeState( stateFactory.newClosedState( CloseSources.PageInteraction ) ) );

function onContentChanged(): void {
	stateMachine.currentState.value.onContentChanged( bannerRef.value.offsetHeight );
}

async function onCloseHandler( source: CloseSources ): Promise<any> {
	await stateMachine.changeState( stateFactory.newClosedState( source ) );
}

</script>

<style lang="scss">
#wmde-banner-app {
	position: fixed;
	width: 100%;
	background: #ffffff;
	z-index: 1000;
}
.wmde-banner-closed {
	display: none;
}
</style>
