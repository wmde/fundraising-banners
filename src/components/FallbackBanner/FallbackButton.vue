<template>
	<button class="wmde-banner-fallback-button" @click.prevent="$emit( 'button-clicked' )">
		{{ $translate( 'fallback-banner-button' ) }}
	</button>
</template>

<script setup lang="ts">
defineEmits( [ 'button-clicked' ] );
</script>
