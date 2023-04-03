<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<BannerMain @close="onCloseMain" v-if="contentState === ContentStates.Main"/>
		<SoftClose
			v-if="contentState === ContentStates.SoftClosing"
			@close="() => onClose( CloseSources.SoftCloseBannerRejected )"
			@maybe-later="() => onClose( CloseSources.MaybeLater )"
			@time-out-close="() => onClose( CloseSources.TimeOut )"
		/>
	</div>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { CloseSources } from '@src/tracking/CloseSources';
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import { nextTick, ref, watch } from 'vue';
import BannerMain from './BannerMain.vue';

enum ContentStates {
	Main = 'wmde-banner-wrapper--main',
	SoftClosing = 'wmde-banner-wrapper--soft-closing'
}

interface Props {
	bannerState: BannerStates
}

defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged' ] );

const contentState = ref<ContentStates>( ContentStates.Main );

watch( contentState, async () => {
	// Wait a tick in order to let the content re-render before notifying the parent
	await nextTick();
	emit( 'bannerContentChanged' );
} );

function onCloseMain(): void {
	contentState.value = ContentStates.SoftClosing;
}

function onClose( closeSource: CloseSources ): void {
	emit( 'bannerClosed', closeSource );
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

	&--closed {
		.wmde-banner-wrapper {
			display: none;
		}
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
