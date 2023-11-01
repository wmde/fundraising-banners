<template>
	<div class="wmde-banner-form wmde-banner-form-multi-step keen-slider" ref="container" @click="onClick">
		<template v-for="( slotName, idx ) in usedSlotNames" :key="idx">
			<div class="keen-slider__slide wmde-banner-form-page" :class="{ 'wmde-banner-form-page--current': currentStepIndex === idx }">
				<slot
					:name="slotName"
					:isCurrent="idx === currentStepIndex"
					:submit="onSubmit"
					:previous="onPrevious"
				/>
			</div>
		</template>
	</div>
	<form ref="submitFormRef" :action="formAction" class="wmde-banner-submit-form" method="post">
		<SubmitValues />
	</form>
</template>

<script setup lang="ts">

import { inject, nextTick, onMounted, ref, useSlots } from 'vue';
import { useKeenSlider } from 'keen-slider/vue';
import { FormActions } from '@src/domain/FormActions';
import SubmitValues from '@src/components/DonationForm/SubComponents/SubmitValues.vue';
import { useFormAction } from '@src/components/composables/useFormAction';
import { StepController } from '@src/components/DonationForm/StepController';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { Tracker } from '@src/tracking/Tracker';
import { TrackingEvent } from '@src/tracking/TrackingEvent';

interface Props {
	showErrorScrollLink?: boolean;
	stepControllers: StepController[];
	pageScroller?: PageScroller
}

const props = withDefaults( defineProps<Props>(), {
	showErrorScrollLink: false
} );
const emit = defineEmits( [ 'formInteraction' ] );

const slots = useSlots();
const usedSlotNames = Object.keys( slots );
const slotNameIndices: Record<string, number> = {};
usedSlotNames.forEach( ( slotName: string, index: number ): void => {
	slotNameIndices[ slotName ] = index;
} );
const tracker = inject<Tracker>( 'tracker' );
const currentStepIndex = ref<number>( 0 );
const { formAction } = useFormAction( inject<FormActions>( 'formActions' ) );
const submitFormRef = ref<HTMLFormElement>( null );

const [ container, slider ] = useKeenSlider( {
	initial: 0,
	drag: false,
	loop: false,
	slides: {
		spacing: 15
	}
} );

function onClick(): void {
	// This is so the banner height is adjusted correctly if form errors change it when they appear
	// We wait using setTimeout as nextTick() doesn't work here for some reason
	setTimeout( () => {
		emit( 'formInteraction' );
	} );
}

const multistepCallbacks = {
	async goToStep( pageName: string ): Promise<void> {
		const pageIndex = slotNameIndices[ pageName ];
		currentStepIndex.value = pageIndex;
		slider.value.moveToIdx( pageIndex );
	},
	async submit( eventData: TrackingEvent ): Promise<void> {
		tracker.trackEvent( eventData );
		await nextTick();
		submitFormRef.value.submit();
	}
};

const onSubmit = async ( extraData: Record<string, string> ): Promise<void> => {
	props.pageScroller?.scrollIntoView( '.wmde-banner-form' );
	await props.stepControllers[ currentStepIndex.value ].submit( multistepCallbacks, extraData );
};

const onPrevious = async (): Promise<void> => {
	await props.stepControllers[ currentStepIndex.value ].previous( multistepCallbacks );
};

onMounted( () => {
	// This fixes Keen Slider rendering a little early and not having the correct width
	setTimeout( () => slider.value.update() );
} );

</script>
