<template>
	<button class="wmde-b-content-copier" :class="{ 'wmde-b-content-copier--copied' : wasJustCopied }" @click="onCopy" @touchstart="onCopy">
		<span class="wmde-b-content-copier__popup" aria-live="assertive"><template v-if="wasJustCopied">{{ $translate( 'copy-popup' ) }}</template></span>
		{{ label }}: <strong>{{ value }}</strong>
		<span class="visually-hidden">{{ $translate( 'copy-click-message' ) }}</span>
		<CopyIcon/>
	</button>
</template>

<script setup lang="ts">

import { inject, ref } from 'vue';
import CopyIcon from '../../../banners/mobile/WMDE_FR_2026_Mobile_DE_04/components/CopyIcon.vue';
import type { Timer } from '@src/utils/Timer';

interface Props {
	label: string,
	value: string,
	copyValue?: string
}

const props = defineProps<Props>();
const timer = inject<Timer>( 'timer' );
const timerId = ref<number>( null );
const wasJustCopied = ref<boolean>( false );

const onCopy = (): void => {
	try {
		navigator.clipboard.writeText( props.copyValue || props.value );

		wasJustCopied.value = true;

		if ( timerId.value !== null ) {
			timer.clearTimeout( timerId.value );
		}

		timerId.value = timer.setTimeout( () => {
			wasJustCopied.value = false;
		}, 1000 );

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch ( err: any ) {
		// Do nothing
	}
};
</script>
