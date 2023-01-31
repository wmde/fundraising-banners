<template>
	<div class="wmde-banner">
		WMDE Banner with a message: <span class="wmde-banner-greeting"> {{greeting}} {{planet}}</span>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
	greeting: ?string
}

withDefaults( defineProps<Props>(), {
	greeting: 'Ahoy'
} );

const planet = ref<string>( 'World' );
</script>

<style>
.wmde-banner {
	font-size: 200%;
	color: green;
	padding: 15px;
	border: solid 2px darkgreen;
}
</style>
