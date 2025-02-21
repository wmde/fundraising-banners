<template>
	<div class="call-to-action">
		<button @click="$emit( 'hide' )">{{ text }}</button>
	</div>
</template>

<script setup lang="ts">
interface Props {
	text: string;
}

defineProps<Props>();
defineEmits( [ 'hide' ] );

</script>
