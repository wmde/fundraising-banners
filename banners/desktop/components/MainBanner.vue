<template>
	<div class="wmde-banner">
		<ButtonClose />
		<div>WMDE Banner with a message: <span class="wmde-banner-greeting"> {{greeting}} {{planet}}</span></div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';

interface Props {
	greeting?: string
}

withDefaults( defineProps<Props>(), {
	greeting: 'Ahoy'
} );

const planet = ref<string>( 'World' );
</script>

<style lang="scss">
/* Import theme */
@use '../styles/styles';

/* All layout styles defined in this component will be overridden by the imported theme file */
.wmde-banner {
	position: relative;
	color: #008000ff;
}
</style>
