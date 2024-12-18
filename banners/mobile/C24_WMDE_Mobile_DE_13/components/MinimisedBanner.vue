<template>
	<div class="wmde-banner-minimised">
		<ButtonClose @close="$emit( 'close' )">
			<span class="wmde-banner-close-icon">
				<CloseIconMobile/>
			</span>
		</ButtonClose>

		<MinimisedText @show-full-page-banner="$emit( 'showFullPageBanner' )"/>
	</div>
</template>

<script setup lang="ts">

import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import MinimisedText from '@banners/mobile/C24_WMDE_Mobile_DE_13/content/MinimisedText.vue';

defineEmits( [ 'close', 'showFullPageBanner' ] );
</script>
