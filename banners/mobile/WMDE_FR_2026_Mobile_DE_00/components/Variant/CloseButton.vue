<template>
	<button class="wmde-b-close" @click="$emit( 'click' )">
		<span class="visually-hidden">
			{{ $translate( 'close' ) }}
		</span>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M17.4948 5.83334L5.82812 17.5" stroke-width="1.94444" stroke-linecap="round" stroke-linejoin="round" style="stroke: var( --icon-stroke );"/>
			<path d="M5.82812 5.83334L17.4948 17.5" stroke-width="1.94444" stroke-linecap="round" stroke-linejoin="round" style="stroke: var( --icon-stroke );"/>
		</svg>
	</button>
</template>

<script setup lang="ts">
defineEmits( [ 'click' ] );
</script>
