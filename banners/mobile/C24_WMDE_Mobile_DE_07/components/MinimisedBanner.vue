<template>
	<div class="wmde-banner-minimised">
		<div class="wmde-banner-minimised-close">
			<button class="wmde-banner-minimised-close-button t-close-main-banner" @click.prevent="$emit( 'close' )">
				<CloseIconMobile/>
			</button>
		</div>
		<div class="wmde-banner-minimised-inner">
			<div class="wmde-banner-minimised-link">
				<InfoIcon/> Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
				<span class="wmde-banner-minimised-highlighted-text">Dann geben Sie jetzt etwas zurück.</span>
			</div>
		</div>
		<div class="wmde-banner-minimised-maximise">
			<div class="wmde-banner-minimised-maximise-tab">
				<button class="wmde-banner-minimised-maximise-button" @click="$emit( 'maximise' )">
					Banner vergrößern <MaximiseIcon/>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import MaximiseIcon from '@src/components/Icons/MaximiseIcon.vue';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';

defineEmits( [ 'showFullPageBanner', 'close', 'maximise' ] );

</script>
