<template>
	<div class="wmde-banner-main">
		<ButtonClose @click.prevent="onClose"/>
		<div>WMDE Banner with a message: <span class="wmde-banner-greeting"> {{greeting}} {{planet}} {{ bannerState }}</span></div>
		<div class="tmp-progress-bar">
			<div class="tmp-progress-bar-inner"></div>
		</div>
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

.tmp-progress-bar {
	height: 20px;
	width: 100%;
	position: relative;
	margin: 10px 0;
	border: 2px solid #ff7863;
	background: #ffffff;

	&-inner {
		width: 0;
		height: 20px;
		min-width: 30px;
		background: #ff7863;
		transition: width 5s ease-in-out;
	}
}

.wmde-banner-visible {
	.tmp-progress-bar-inner {
		width: 100%;
	}
}

</style>
