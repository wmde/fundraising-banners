<template>
	<div class="wmde-banner-main">
		<ButtonClose @click.prevent="onClose"/>
		<div>WMDE Banner with a message: <span class="wmde-banner-greeting"> {{greeting}} {{ $translate('no-interval-message')}} {{ bannerState }}</span></div>
		<BannerText />
		<ProgressBar amount-to-show-on-right="TARGET"/>
	</div>
</template>

<script setup lang="ts">
import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { CloseSources } from '@src/tracking/CloseSources';
import BannerText from './BannerText.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';

interface Props {
	greeting?: string,
	bannerState: BannerStates
}

withDefaults( defineProps<Props>(), {
	greeting: 'Ahoy'
} );

const emit = defineEmits( [ 'banner-closed' ] );

function onClose(): void {
	emit( 'banner-closed', CloseSources.MainBanner );
}

</script>

<style lang="scss">
/* Import theme */
@use '../styles/styles';

/* All layout styles defined in this component will be overridden by the imported theme file */
.wmde-banner-main {
	position: relative;
	color: #008000ff;
}

.wmde-banner-visible {
	.wmde-banner-progress-bar-fill {
		width: var( --wmde-banner-progress-bar-width );
	}
	.wmde-banner-progress-bar-text,
	.wmde-banner-progress-bar-fill-text {
		opacity: 1;
	}
}

</style>
