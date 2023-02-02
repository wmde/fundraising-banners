<template>
	<div className="wmde-banner-close">
		<a className="wmde-banner-close-link">
			<slot><CloseIconDefault /></slot>
		</a>
	</div>
</template>
<script setup lang="ts">
import CloseIconDefault from '@src/components/Icons/CloseIconDefault.vue';
</script>
<style>
.wmde-banner-close {
	position: absolute;
	right: 5px;
	top: 5px;
	width: 32px;
	height: 32px
}

.wmde-banner-close-link {
	text-decoration: none;
}
</style>
