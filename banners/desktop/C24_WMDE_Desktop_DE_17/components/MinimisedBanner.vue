<template>
	<div class="wmde-banner-minimised">

		<div class="wmde-banner-minimised-content-row">
			<div class="wmde-banner-minimised-column-left">
				<div class="wmde-banner-minimised-content-message">
					<MinimisedText/>
				</div>
			</div>
			<div class="wmde-banner-minimised-column-right">

				<div class="wmde-banner-minimised-button-group">
					<button class="wmde-banner-minimised-maximise" @click.prevent="$emit( 'maximise' )">Vergrößern <ChevronDownIcon/></button>
					<slot name="close-button" @close="$emit( 'close' )"/>
				</div>

				<div class="wmde-banner-minimised-content-button">
					<button class="wmde-banner-minimised-submit-button" @click.prevent="$emit( 'maximise-cta' )">
						Jetzt spenden
					</button>
				</div>
			</div>
		</div>
		<slot name="footer"/>

	</div>
</template>

<script setup lang="ts">
import MinimisedText from '../content/MinimisedText.vue';
import ChevronDownIcon from '@src/components/Icons/ChevronDownIcon.vue';
defineEmits( [ 'close', 'maximise', 'maximise-cta' ] );
</script>
