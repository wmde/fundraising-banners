<template>
	<button class="wmde-fbb-button" @click.prevent="$emit( 'button-clicked' )">
		{{ $translate( 'fallback-banner-button' ) }}
	</button>
</template>

<script setup lang="ts">
defineEmits( [ 'button-clicked' ] );
</script>
