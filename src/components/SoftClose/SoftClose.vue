<template>
	<div
		class="wmde-banner-soft-close"
		:class="{ 'wmde-banner-soft-close-with-close-icon': showCloseIcon }"
		:style="{ '--wmde-banner-soft-close-seconds': secondsTotal + 's' }"
	>
		<div class="wmde-banner-soft-close-countdown-bar">
			<div class="wmde-banner-soft-close-countdown-bar-fill"></div>
		</div>
		<div class="wmde-banner-soft-close-columns">

			<div class="wmde-banner-soft-close-column wmde-banner-soft-close-actions">
				<slot>
					<span class="wmde-banner-soft-close-prompt">{{ $translate( 'soft-close-prompt' ) }}</span>
				</slot>
				<div class="wmde-banner-soft-close-buttons">
					<slot name="buttons" :timer="timer">
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
					</slot>
				</div>
			</div>

			<div class="wmde-banner-soft-close-column wmde-banner-soft-close-countdown-text">
				<div
					class="wmde-banner-soft-close-countdown-text-wrapper"
					v-html="$translate( 'soft-close-countdown-text', { seconds: secondsRemaining } )"
				/>

			</div>

			<ButtonClose v-if="showCloseIcon" @close="onCloseClick"/>

		</div>
	</div>

</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import { Timer } from '@src/utils/Timer';

interface Props {
	secondsTotal?: number;
	showCloseIcon?: boolean;
}

const props = withDefaults( defineProps<Props>(), {
	secondsTotal: 15,
	showCloseIcon: false
} );

const timer = inject<Timer>( 'timer' );
const secondsRemaining = ref<number>( props.secondsTotal );

const emit = defineEmits( [ 'close', 'maybeLater', 'timeOutClose' ] );

const onMaybeLaterClick = (): void => {
	emit( 'maybeLater' );
};

const onCloseClick = (): void => {
	emit( 'close' );
};

onMounted( () => {
	timer.setInterval( () => {
		secondsRemaining.value = secondsRemaining.value - 1;
		if ( secondsRemaining.value <= 0 ) {
			emit( 'timeOutClose' );
		}
	}, 1000 );
} );

</script>
