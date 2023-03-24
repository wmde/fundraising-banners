<template>
	<div class="wmde-banner-main">
		<ButtonClose @click.prevent="onClose"/>
		<div>WMDE Banner with a message: <span class="wmde-banner-greeting"> {{greeting}} {{ $translate('no-interval-message')}} {{ bannerState }}</span></div>
		<BannerText />
		<ProgressBar amount-to-show-on-right="TOTAL"/>
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
@import '../styles/styles';

/* All layout styles defined in this component will be overridden by the imported theme file */
.wmde-banner-main {
	position: relative;
	color: #008000ff;
}

.wmde-banner-progress-bar {
	height: 20px;
	width: 100%;
	position: relative;
	margin: 10px 0;
	border: 2px solid #ff7863;
	background: #ffffff;

	&-fill {
		width: 0;
		height: 20px;
		min-width: 30px;
		background: #ff7863;
		transition: width 5s ease-in-out;
	}

	&-text,
	&-fill-text {
		opacity: 0;
		transition: opacity 1s ease-in-out;
		transition-delay: 5s;
	}
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
