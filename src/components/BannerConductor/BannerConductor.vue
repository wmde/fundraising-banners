<template>
	<div ref="bannerRef" class="wmde-banner" :class="{
		'wmde-banner--initial' : bannerState.stateName === BannerStates.Initial,
		'wmde-banner--pending' : bannerState.stateName === BannerStates.Pending,
		'wmde-banner--showing' : bannerState.stateName === BannerStates.Showing,
		'wmde-banner--visible' : bannerState.stateName === BannerStates.Visible,
		'wmde-banner--closed' : bannerState.stateName === BannerStates.Closed
	}">
		<component :is="banner" v-bind="bannerProps" :bannerState="bannerState.stateName"/>
	</div>
</template>

<script setup lang="ts">

import { Page } from '@src/page/Page';
import { onMounted, ref } from 'vue';
import { BannerConfig } from '@src/BannerConfig';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { ResizeHandler } from '@src/utils/ResizeHandler';
import { BannerStateMachine } from '@src/components/BannerConductor/StateMachine/BannerStateMachine';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { PendingState } from '@src/components/BannerConductor/StateMachine/states/PendingState';
import { NotShownState } from '@src/components/BannerConductor/StateMachine/states/NotShownState';
import { ShowingState } from '@src/components/BannerConductor/StateMachine/states/ShowingState';
import { VisibleState } from '@src/components/BannerConductor/StateMachine/states/VisibleState';
import { ClosedState } from '@src/components/BannerConductor/StateMachine/states/ClosedState';
import { InitialState } from '@src/components/BannerConductor/StateMachine/states/InitialState';

interface Props {
	page: Page,
	bannerConfig: BannerConfig,
	resizeHandler: ResizeHandler,
	banner: Object,
	bannerProps: Object
}

const props = defineProps<Props>();
const bannerRef = ref( null );
const bannerState = ref<BannerState>( new InitialState() );
const stateMachine = new BannerStateMachine( bannerState );

onMounted( async () => {
	await stateMachine.changeState( new PendingState( props.page, bannerRef.value.offsetHeight, props.bannerConfig.delay ) );

	if ( props.page.shouldShowBanner() ) {
		await stateMachine.changeState( new ShowingState( props.page, props.bannerConfig.transitionDuration ) );
		await stateMachine.changeState( new VisibleState( props.page ) );
	} else {
		await stateMachine.changeState( new NotShownState() );
	}
} );

props.resizeHandler.onResize( () => stateMachine.currentState.value.onResize( bannerRef.value.offsetHeight ) );
props.page.onPageEventThatShouldHideBanner( () => stateMachine.changeState( new ClosedState() ) );

</script>

<style lang="scss">
	#wmde-banner-app {
		position: fixed;
		top: 0;
		width: 100%;
		background: #ffffff;
		z-index: 1000;
	}
</style>
