<template>
	<div class="wmde-fbb-small-footer">
		<div class="wmde-fbb-small-footer-usage">
			<button class="wmde-fbb-usage-link" @click="$emit( 'use-of-funds-button-clicked' )">{{ $translate( 'use-of-funds-link' ) }}</button>
		</div>
	</div>
</template>

<script setup lang="ts">

defineEmits( [ 'use-of-funds-button-clicked' ] );

</script>
