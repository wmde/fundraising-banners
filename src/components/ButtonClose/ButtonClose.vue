<template>
	<div class="wmde-banner-close">
		<a class="wmde-banner-close-link">
			<slot>
				<CloseIconDefault/>
			</slot>
		</a>
	</div>
</template>
<script setup lang="ts">
import CloseIconDefault from '@src/components/Icons/CloseIconDefault.vue';
</script>
