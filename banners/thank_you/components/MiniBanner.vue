<template>
	<div class="wmde-banner-mini">
		<ButtonClose @close="$emit( 'close' )"/>
		<button class="wmde-banner-info-button" @click.prevent="$emit( 'showModal' )">i</button>
		<div class="wmde-banner-mini-inner">
			<div class="wmde-banner-mini-text">
				<slot name="text"/>
				<button class="wmde-banner-mini-button" @click.prevent="$emit( 'showModal' )">{{ $translate( 'open-modal' ) }}</button>
			</div>

			<template v-if="showFireworks">
				<div class="wmde-banner-firework wmde-banner-firework-lefter"></div>
				<div class="wmde-banner-firework wmde-banner-firework-left"></div>
				<div class="wmde-banner-firework wmde-banner-firework-center"></div>
				<div class="wmde-banner-firework wmde-banner-firework-right"></div>
				<div class="wmde-banner-firework wmde-banner-firework-righter"></div>
			</template>
		</div>
		<slot name="progress"/>
	</div>
</template>

<script setup lang="ts">

import ButtonClose from './ButtonClose.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';

interface Props {
	showFireworks: boolean;
	bannerState: BannerStates;
}

defineProps<Props>();
defineEmits( [ 'close', 'showModal' ] );

</script>
