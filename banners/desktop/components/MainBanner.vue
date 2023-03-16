<template>
	<div class="wmde-banner-main">
		<ButtonClose @click.prevent="onClose"/>
		<div>WMDE Banner with a message: <span class="wmde-banner-greeting"> {{greeting}} {{planet}} {{ bannerState }}</span></div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { CloseSources } from '@src/tracking/CloseSources';

interface Props {
	greeting?: string,
	bannerState: BannerStates
}

withDefaults( defineProps<Props>(), {
	greeting: 'Ahoy'
} );

const emit = defineEmits( [ 'banner-closed' ] );

function onClose() {
	emit( 'banner-closed', CloseSources.MainBanner );
}

const planet = ref<string>( 'World' );
</script>

<style lang="scss">
/* Import theme */
@import '../styles/styles';

/* All layout styles defined in this component will be overridden by the imported theme file */
.wmde-banner-main {
	position: relative;
	color: #008000ff;
}
</style>
