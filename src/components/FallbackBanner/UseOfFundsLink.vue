<template>
	<a class="wmde-banner-fallback-usage-link" @click.prevent="$emit( 'button-clicked' )">
		{{ $translate( 'use-of-funds-link' ) }}
	</a>
</template>

<script setup lang="ts">
defineEmits( [ 'button-clicked' ] );
</script>
