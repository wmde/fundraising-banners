<template>
	<slot v-if="showComponentForLargeScreen" name="componentForLargeScreen" ></slot>
	<slot v-else name="componentForSmallScreen" ></slot>
</template>

<script setup lang="ts">

import { onMounted, onUnmounted, ref } from 'vue';

interface Props {
	minWidth: number;
}

const props = defineProps<Props>();
const showComponentForLargeScreen = ref<boolean>( false );

const onResize = (): void => {
	showComponentForLargeScreen.value = window.innerWidth > props.minWidth;
};

onMounted( () => {
	window.addEventListener( 'resize', onResize );

} );

onUnmounted( () => {
	window.removeEventListener( 'resize', onResize );
} );

</script>
