<template>
	<div class="wmde-banner-minimised">

		<div class="wmde-banner-minimised-button-group">
			<button class="wmde-banner-minimised-maximise" @click.prevent="$emit( 'maximise' )"><ChevronDownIcon/></button>
			<ButtonClose @close="$emit( 'close' )"/>
		</div>

		<div class="wmde-banner-minimised-content">
			<div class="wmde-banner-minimised-content-message">
				<MinimisedText/>
			</div>
			<div class="wmde-banner-minimised-content-button">
				<button class="wmde-banner-minimised-submit-button" @click.prevent="$emit( 'maximise' )">
					Weiter, um Spende abzuschlieẞen
				</button>
			</div>
		</div>

		<slot name="footer"/>
	</div>
</template>

<script setup lang="ts">

import MinimisedText from '../content/MinimisedText.vue';
import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import ChevronDownIcon from './ChevronDownIcon.vue';

defineEmits( [ 'close', 'maximise' ] );

</script>
