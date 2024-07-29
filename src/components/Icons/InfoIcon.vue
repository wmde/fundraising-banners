<template>
	<svg :width="width" :height="height" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="8" cy="8" r="8" :fill="fill"/>
		<path :transform="transformValue" :d="pathData" fill="white"/>
	</svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	fill?: string,
	width?: string,
	height?: string,
	type?: 'straight' | 'italic'
}

const props = withDefaults( defineProps<Props>(), {
	fill: '#2B6DA0',
	width: '16',
	height: '16',
	type: 'straight'
} );

const straight = 'M8.80003 5.73332V11.7173H10.2667V13.0667H5.96937V11.7173H7.33337V7.19999H5.8667V5.73332H8.80003ZM7.' +
	'33337 2.79999H8.80003V4.26665H7.33337V2.79999Z';

const italic = 'M12.681 11.754l-2.267 7.864c-.125.45-.188.745-.188.885 0 .08.033.156.1.226.066.07.136.105.21.105.125 ' +
	'0 .25-.055.376-.165.332-.273.73-.767 1.194-1.482l.376.22c-1.113 1.94-2.296 2.91-3.55 2.91-.48 ' +
	'0-.86-.135-1.144-.404a1.349 1.349 0 0 1-.426-1.023c0-.273.062-.62.188-1.04l1.537-5.286c.147-.51.221-.892.221-1.15a.566.566 ' +
	'0 0 0-.21-.432c-.14-.125-.332-.188-.575-.188-.11 0-.243.004-.398.011l.144-.442 3.749-.609h.663zm-.685-5.087c.457 0 ' +
	'.842.159 1.156.475.313.318.47.701.47 1.15 0 .45-.16.834-.476 1.15-.317.318-.7.476-1.15.476-.443 ' +
	'0-.822-.158-1.14-.475a1.566 1.566 0 0 1-.475-1.15c0-.45.157-.833.47-1.15a1.549 1.549 0 0 1 1.145-.476z';

const pathData = computed( () => props.type === 'italic' ? italic : straight );
const transformValue = computed( () => props.type === 'italic' ? 'scale(0.69) translate(1.5, -3.5)' : 'none' );

</script>
