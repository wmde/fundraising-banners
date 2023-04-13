<template>
	<div class="wmde-banner-soft-close" :style="{ '--wmde-banner-soft-close-seconds': secondsTotal + 's' }">
		<div class="wmde-banner-soft-close-countdown-bar">
			<div class="wmde-banner-soft-close-countdown-bar-fill"></div>
		</div>
		<div class="wmde-banner-soft-close-columns">

			<div class="wmde-banner-soft-close-column wmde-banner-soft-close-actions">
				<slot>
					<span class="wmde-banner-soft-close-prompt">{{ $translate( 'soft-close-prompt' ) }}</span>
				</slot>
				<div class="wmde-banner-soft-close-buttons">
					<button
						class="wmde-banner-soft-close-button wmde-banner-soft-close-button-maybe-later"
						@click="onMaybeLaterClick">
						{{ $translate( 'soft-close-button-maybe-later' ) }}
					</button>
					<button
						class="wmde-banner-soft-close-button wmde-banner-soft-close-button-close"
						@click="onCloseClick">
						{{ $translate( 'soft-close-button-close' ) }}
					</button>
				</div>
			</div>

			<div class="wmde-banner-soft-close-column wmde-banner-soft-close-countdown-text">
				<div
					class="wmde-banner-soft-close-countdown-text-wrapper"
					v-html="$translate( 'soft-close-countdown-text', { seconds: secondsRemaining } )"
				></div>
		</div>

	</div>
	</div>

</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface Props {
	secondsTotal?: number
}

const props = withDefaults( defineProps<Props>(), {
	secondsTotal: 15
} );

const timer = ref<number>( null );
const secondsRemaining = ref<number>( props.secondsTotal );

const emit = defineEmits( [ 'close', 'maybeLater', 'timeOutClose' ] );

const onMaybeLaterClick = (): void => {
	window.clearInterval( timer.value );
	emit( 'maybeLater' );
};

const onCloseClick = (): void => {
	window.clearInterval( timer.value );
	emit( 'close' );
};

onMounted( () => {
	timer.value = window.setInterval( () => {
		secondsRemaining.value = secondsRemaining.value - 1;
		if ( secondsRemaining.value <= 1 ) {
			window.clearInterval( timer.value );
			emit( 'timeOutClose' );
		}
	}, 1000 );
} );

onUnmounted( () => {
	window.clearInterval( timer.value );
} );

</script>

<style lang="scss">
	@keyframes wmde-countdown-bar {
		0% {
			transform: translateX( 0% );
		}
		100% {
			transform: translateX( -100% );
		}
	}

	.wmde-banner {
		&-soft-close {
			z-index: 20000;
			width: 100%;

			&-columns {
				display: flex;
			}

			&-actions {
				display: flex;
				flex-wrap: wrap;
			}

			&-button,
			&-prompt {
				display: inline-block;
				padding: 0;
				margin: 0;
			}

			&-button {
				cursor: pointer;
			}

			&-countdown-text {
				display: none;
			}

			&-countdown-bar {
				position: relative;
				overflow: hidden;
			}

			&-countdown-bar-fill {
				position: absolute;
				height: 100%;
				width: 100%;
				top: 0;
				left: 0;
				animation: wmde-countdown-bar var( --wmde-banner-soft-close-seconds ) linear;
				animation-fill-mode: forwards;
			}
		}
	}

</style>
