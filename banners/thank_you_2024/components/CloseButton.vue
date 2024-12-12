<template>
	<button class="wmde-banner-close" @click="$emit( 'click' )" :aria-label="label">
		<span aria-hidden="true">
			<span class="wmde-banner-close-label">
				{{ label }}
			</span>
			<svg aria-hidden="true" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line x1="21.3536" y1="0.353553" x2="1.35355" y2="20.3536" style="stroke: var( --close-icon-stroke )"/>
				<line x1="20.6464" y1="20.3536" x2="0.646445" y2="0.353555" style="stroke: var( --close-icon-stroke )"/>
			</svg>
		</span>
	</button>
</template>

<script setup lang="ts">

interface Props {
	label: string;
}

defineProps<Props>();
defineEmits( [ 'click' ] );
</script>
