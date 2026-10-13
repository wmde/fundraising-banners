<template>
	<div class="wmde-b-soft-close" :style="{ '--seconds': secondsTotal + 's' }" aria-labelledby="wmde-soft-close-label wmde-soft-close-timer" tabindex="-1" ref="softClose">

		<div class="wmde-b-soft-close__countdown">
			<div/>
		</div>

		<div class="wmde-b-soft-close__content">
			<button class="wmde-b-nav-button" @click.prevent="onCloseXIconClick" data-icon>
				<span class="visually-hidden">{{ $translate( 'close' ) }}</span>
				<CloseIconMobile/>
			</button>

			<div class="wmde-c-cluster">
				<p id="wmde-soft-close-label">{{ $translate( 'soft-close-prompt' ) }}</p>

				<button class="wmde-b-button" @click="onMaybeLaterClick" data-theme="secondary">
					{{ $translate( 'soft-close-button-maybe-later' ) }}
				</button>

				<button class="wmde-b-button" @click="onCloseClick" data-theme="secondary">
					{{ $translate( 'soft-close-button-close' ) }}
				</button>

				<div class="wmde-b-soft-close__timer" id="wmde-soft-close-timer" v-html="$translate( 'soft-close-countdown-text', { seconds: secondsRemaining } )"/>
			</div>

		</div>

	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import type { Timer } from '@src/utils/Timer';
import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';

interface Props {
	secondsTotal?: number;
}

const props = withDefaults( defineProps<Props>(), {
	secondsTotal: 15
} );

const softClose = ref<HTMLElement>( null );
const timer = inject<Timer>( 'timer' );
const secondsRemaining = ref<number>( props.secondsTotal );

const emit = defineEmits( [ 'close', 'maybeLater', 'xIconClose', 'timeOutClose' ] );

const onMaybeLaterClick = (): void => {
	timer.clearAll();
	emit( 'maybeLater' );
};

const onCloseClick = (): void => {
	timer.clearAll();
	emit( 'close' );
};

const onCloseXIconClick = (): void => {
	timer.clearAll();
	emit( 'xIconClose' );
};

onMounted( () => {
	softClose.value.focus();
	timer.setInterval( () => {
		secondsRemaining.value = secondsRemaining.value - 1;
		if ( secondsRemaining.value <= 0 ) {
			emit( 'timeOutClose' );
		}
	}, 1000 );
} );

</script>
