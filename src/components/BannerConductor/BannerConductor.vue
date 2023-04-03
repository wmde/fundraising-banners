<template>
	<div ref="bannerRef" class="wmde-banner" :class="bannerState.stateName">
		<component
			:is="banner"
			v-bind="bannerProps"
			:bannerState="bannerState.stateName"
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
import { BannerStateMachine } from '@src/components/BannerConductor/StateMachine/BannerStateMachine';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { PendingState } from '@src/components/BannerConductor/StateMachine/states/PendingState';
import { NotShownState } from '@src/components/BannerConductor/StateMachine/states/NotShownState';
import { ShowingState } from '@src/components/BannerConductor/StateMachine/states/ShowingState';
import { VisibleState } from '@src/components/BannerConductor/StateMachine/states/VisibleState';
import { ClosedState } from '@src/components/BannerConductor/StateMachine/states/ClosedState';
import { InitialState } from '@src/components/BannerConductor/StateMachine/states/InitialState';
import { CloseSources } from '@src/tracking/CloseSources';
import { Vector2 } from '@src/utils/Vector2';
import { ImpressionCount } from '@src/utils/ImpressionCount';

interface Props {
	page: Page,
	bannerConfig: BannerConfig,
	resizeHandler: ResizeHandler,
	banner: Object,
	bannerProps?: Object,
	impressionCount: ImpressionCount
}

const props = defineProps<Props>();
const bannerRef = ref( null );
const bannerState = ref<BannerState>( new InitialState() );
const stateMachine = new BannerStateMachine( bannerState );

onMounted( async () => {
	await stateMachine.changeState( new PendingState( props.page, bannerRef.value.offsetHeight, props.bannerConfig.delay ) );
	const bannerNotShownReason = props.page.getReasonToNotShowBanner( new Vector2( bannerRef.value.offsetWidth, bannerRef.value.offsetHeight ) );

	if ( bannerNotShownReason ) {
		await stateMachine.changeState( new NotShownState( bannerNotShownReason, props.page, props.page, props.resizeHandler ) );
	} else {
		await stateMachine.changeState( new ShowingState( props.page, props.bannerConfig.transitionDuration ) );
		await stateMachine.changeState( new VisibleState( props.page, props.impressionCount ) );
	}
} );

props.resizeHandler.onResize( () => stateMachine.currentState.value.onResize( bannerRef.value.offsetHeight ) );
props.page.onPageEventThatShouldHideBanner( () => stateMachine.changeState( new ClosedState( CloseSources.PageInteraction, props.page, props.page, props.resizeHandler ) ) );

function onContentChanged(): void {
	stateMachine.currentState.value.onContentChanged( bannerRef.value.offsetHeight );
}

async function onCloseHandler( source: CloseSources ): Promise<any> {
	await stateMachine.changeState( new ClosedState( source, props.page, props.page, props.resizeHandler ) );
}

</script>

<style lang="scss">
	#wmde-banner-app {
		position: fixed;
		top: 0;
		width: 100%;
		background: #ffffff;
		z-index: 1000;
	}
	.wmde-banner-closed {
		display: none;
	}
</style>
