<template>
	<span v-if="content !== ''" class="wmde-banner-text-animated-highlight">
		{{ content }}
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
