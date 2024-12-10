<template>
	<span v-if="content !== ''" class="wmde-banner-text-animated-highlight">
		<span class="wmde-banner-text-animated-highlight-text">{{ content }}</span>
	</span>
</template>

<script setup lang="ts">

interface Props {
	content?: string;
}

withDefaults( defineProps<Props>(), {
	content: ''
} );

</script>
