<template>
	<dialog class="wmde-banner-full" ref="fullPageBanner">
		<CloseButton :label="$translate( 'close-full-page' ) + '&nbsp;&nbsp;'" @click="$emit( 'close' )"/>
		<div class="wmde-banner-full-scroll">
			<div class="wmde-banner-full-inner">
				<div class="wmde-banner-full-content">
					<article>
						<slot name="text"/>
					</article>
					<aside>
						<ExecutiveDirectorsImage/>
						<StatsBox :number-of-people="numberOfPeople"/>
					</aside>
				</div>
				<div class="wmde-banner-full-cta">
					<a href="#" @click.prevent="$emit( 'membershipWithAmount' )" class="wmde-banner-full-cta-with">
						{{ $translate( 'call-to-action-button-amount-per-month', { amount: 5 } ) }}
					</a>
					<a href="#" @click.prevent="$emit( 'membershipWithoutAmount' )"  class="wmde-banner-full-cta-without">
						{{ $translate( 'call-to-action-button-different-amount' ) }}
					</a>
				</div>
				<footer>
					<slot name="benefits"/>
					<div class="wmde-banner-subscribe">
						<slot name="subscribe"/>
					</div>
				</footer>
			</div>
		</div>
	</dialog>
</template>

<script setup lang="ts">

import { ref, watch } from 'vue';
import CloseButton from './CloseButton.vue';
import ExecutiveDirectorsImage from '../content/ExecutiveDirectorsImage.vue';
import StatsBox from '../components/StatsBox.vue';

interface Props {
	visible: boolean;
	numberOfPeople: string
}

const props = defineProps<Props>();
defineEmits( [ 'close', 'membershipWithAmount', 'membershipWithoutAmount' ] );
const fullPageBanner = ref<HTMLDialogElement>();

watch( () => props.visible, ( newVisible: boolean ) => {
	if ( newVisible ) {
		fullPageBanner.value.showModal();
	} else {
		fullPageBanner.value.close();
	}
} );

</script>
