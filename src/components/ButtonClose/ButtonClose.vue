<template>
	<button class="wmde-banner-close">
		<slot>
			<CloseIconDefault/>
		</slot>
	</button>
</template>
<script setup lang="ts">
import CloseIconDefault from '@src/components/Icons/CloseIconDefault.vue';
</script>
