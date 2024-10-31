<template>
	<div class="wmde-banner-minimised">
		<div class="wmde-banner-minimised-inner">
			<div class="wmde-banner-mini-close">
				<button class="wmde-banner-mini-close-button t-close-main-banner" @click.prevent="$emit( 'close' )">
					<CloseIconMobile/>
				</button>
			</div>

			<header class="wmde-banner-minimised-headline">
				Ist Ihnen Wikipedia 5&nbsp;€ wert?
			</header>
			<div class="wmde-banner-minimised-link">
				Ja, ich möchte <button @click="$emit( 'showFullPageBanner' )">jetzt freies wissen unterstützen <HeartIcon/></button>
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

import HeartIcon from '@src/components/Icons/HeartIcon.vue';
import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import MaximiseIcon from '@src/components/Icons/MaximiseIcon.vue';

defineEmits( [ 'showFullPageBanner', 'close', 'maximise' ] );

</script>
