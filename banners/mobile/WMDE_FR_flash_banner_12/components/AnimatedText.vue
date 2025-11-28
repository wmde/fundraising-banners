<template>
	<span class="wmde-b-animated-text" :class="{ 'wmde-b-animated-text--visible' : isVisible }">
		<slot/>
	</span>
</template>

<script setup lang="ts">
interface Props {
	isVisible?: boolean;
}

defineProps<Props>();
</script>
