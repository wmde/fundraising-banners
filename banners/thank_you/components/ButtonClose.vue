<template>
	<button class="wmde-banner-close t-close-main-banner" @click.prevent="$emit( 'close' )">
		<CloseIcon/>
	</button>
</template>
<script setup lang="ts">
import CloseIcon from './icons/CloseIcon.vue';

defineEmits( [ 'close' ] );
</script>
