<template>
	<div class="wmde-banner-wrapper">
		<ButtonClose @click.prevent="onClose"/>
		<div class="wmde-banner-content">
			<div class="wmde-banner-column-left">
				<BannerText />
				<ProgressBar amount-to-show-on-right="TARGET"/>
			</div>
			<div class="wmde-banner-column-right">
				Donation Form
			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { CloseSources } from '@src/tracking/CloseSources';
import BannerText from '../content/BannerText.vue';
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
@use '../styles/styles';
@use 'src/themes/treedip/variables/globals';
@use 'src/themes/treedip/variables/fonts';
@use 'src/themes/treedip/variables/colors';

.wmde-banner {
	&-wrapper {
		font-size: 14px;
		font-family: fonts.$ui;
		box-shadow: 0 3px 0.6em rgba( 60 60 60 / 40% );
		background-color: colors.$white;
	}

	&-content {
		display: flex;
		flex-direction: row;
		order: 1;
		padding: 12px 24px 0;
	}

	&-column-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1 1 auto;
		margin-bottom: 0;
		overflow-y: hidden;
		margin-right: 30px;
		padding: 0 15px;
		border: 5px solid colors.$primary;
		border-radius: 9px;
	}

	&-column-right {
		order: 2;
		flex: 0 0 globals.$form-width;
		display: flex;
		flex-direction: column;
		width: globals.$form-width;
		min-height: 315px;
		padding: 10px 0;
	}

	&-message {
		height: 100%;
		display: flex;
		align-items: center;
	}
}

</style>
