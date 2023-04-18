<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<MiniBanner
			v-if="contentState === ContentStates.Mini"
			:banner-is-visible="bannerIsVisible"
			@close="onCloseMiniBanner"
			@show-full-page-banner="onshowFullPageBanner"
		/>
		<FullPageBanner
			v-if="contentState === ContentStates.FullPage"
			:form-controller="formController"
			:forms="forms"
			@close="() => onClose( CloseSources.FollowUpBanner )"
		/>
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
import { Component, computed, nextTick, ref, watch } from 'vue';
import FullPageBanner from './FullPageBanner.vue';
import { FormController } from '@src/utils/FormController/FormController';
import MiniBanner from './MiniBanner.vue';

enum ContentStates {
	Mini = 'wmde-banner-wrapper--mini',
	FullPage = 'wmde-banner-wrapper--full-page',
	SoftClosing = 'wmde-banner-wrapper--soft-closing'
}

interface Props {
	bannerState: BannerStates;
	formController: FormController;
	forms: Component[]
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged' ] );

const bannerIsVisible = computed( () => props.bannerState === BannerStates.Visible );

const contentState = ref<ContentStates>( ContentStates.Mini );

watch( contentState, async () => {
	// Wait a tick in order to let the content re-render before notifying the parent
	await nextTick();
	emit( 'bannerContentChanged' );
} );

function onCloseMiniBanner(): void {
	contentState.value = ContentStates.SoftClosing;
}

function onClose( closeSource: CloseSources ): void {
	emit( 'bannerClosed', closeSource );
}

function onshowFullPageBanner(): void {
	contentState.value = ContentStates.FullPage;
}
</script>

<style lang="scss">
@use 'src/themes/treedip/variables/globals';
@use 'src/themes/treedip/variables/fonts';
@use 'src/themes/treedip/variables/colors';

.wmde-banner {
	&-wrapper {
		font-size: 16px;
		font-family: fonts.$ui;
		box-shadow: 0 3px 0.6em rgba( 60 60 60 / 40% );
		background-color: colors.$white;
	}

	&--closed {
		.wmde-banner-wrapper {
			display: none;
		}
	}
}

</style>
