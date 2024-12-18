<template>
	<a
		class="wmde-banner-fallback-usage-link"
		@click.prevent="$emit( 'button-clicked' )"
		:title="$translate( 'use-of-funds-link-description' )"
	>
		{{ $translate( 'use-of-funds-link' ) }}
	</a>
</template>

<script setup lang="ts">
defineEmits( [ 'button-clicked' ] );
</script>
