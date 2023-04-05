<template>
	<div class="wmde-banner-multistep-donation-form" ref="container">
		<template v-for="( slotName, idx ) in usedSlotNames" :key="slotName">
			<div class="keen-slider__slide wmde-banner-donation-form-page">
				<div :class="[
								'keen-slider__slide-content',
								'wmde-banner-donation-form-page-content',
								{ 'wmde-banner-donation-form-page-content--current': currentFormPage === idx }
							]">
					<slot
						:name="slotName"
						@submit="onSubmit"
						@next="onNext"
						@previous="onPrevious"
					/>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">

import { ref, useSlots } from 'vue';
import { useKeenSlider } from 'keen-slider/vue';
import { FormController } from '@src/utils/FormController/FormController';

const currentFormPage = ref<number>( 0 );

interface Props {
	showErrorScrollLink?: boolean;
	formController: FormController;
}

const props = withDefaults( defineProps<Props>(), {
	showErrorScrollLink: false
} );

const slots = useSlots();

const [ container, slider ] = useKeenSlider( {
	initial: 0
} );

const usedSlotNames = Object.keys( slots );

const onSubmit = ( extraData: Record<string, string> = {} ): void => {
	props.formController.submit( { pageNumber: currentFormPage.value, extraData } );
};

const onPrevious = (): void => {
	props.formController.previous();
};

const onNext = (): void => {
	props.formController.next();
};

</script>

<style lang="scss">

</style>
