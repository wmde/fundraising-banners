<template>
	<div class="wmde-banner-form wmde-banner-form-multi-step keen-slider" ref="container">
		<template v-for="( form, idx ) in forms" :key="idx">
			<div class="keen-slider__slide wmde-banner-form-page"
					:class="{ 'wmde-banner-form-page--current': currentFormPageIndex === idx }">
				<component
						:is="form"
						:page-index="idx"
						@submit="onSubmit"
						@next="onNext"
						@previous="onPrevious"
				/>
			</div>
		</template>
	</div>
	<form ref="submitFormRef" :action="formAction" class="wmde-banner-submit-form">
		<SubmitValues />
	</form>
</template>

<script setup lang="ts">

import { inject, nextTick, ref } from 'vue';
import { useKeenSlider } from 'keen-slider/vue';
import { FormController } from '@src/utils/FormController/FormController';
import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';
import { FormActions } from '@src/domain/FormActions';
import SubmitValues from '@src/components/DonationForm/SubComponents/SubmitValues.vue';
import { useFormAction } from '@src/components/composables/useFormAction';

interface Props {
	showErrorScrollLink?: boolean;
	formController: FormController;
	forms: Array<any>;
}

const props = withDefaults( defineProps<Props>(), {
	showErrorScrollLink: false
} );

const currentFormPageIndex = ref<number>( 0 );
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

const onSubmit = ( payload: FormSubmitData ): void => {
	props.formController.submitStep( payload );
};

const onPrevious = ( payload: FormSubmitData ): void => {
	props.formController.previous( payload );
};

const onNext = ( payload: FormSubmitData ): void => {
	props.formController.next( payload );
};

props.formController.onNext( () => {
	currentFormPageIndex.value = currentFormPageIndex.value + 1;
	slider.value.next();
} );

props.formController.onPrevious( () => {
	currentFormPageIndex.value = currentFormPageIndex.value - 1;
	slider.value.prev();
} );

props.formController.onGoToStep( ( pageIndex: number ) => {
	currentFormPageIndex.value = pageIndex;
	slider.value.moveToIdx( pageIndex );
} );

props.formController.onSubmit( async () => {
	await nextTick();
	submitFormRef.value.submit();
} );

</script>

<style lang="scss">
.wmde-banner {
	&-form {
		display: flex;
		height: 100%;
		width: 100%;
		overflow: hidden;

		&-button-container {
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: flex-start;
			flex: 0 1 auto;
			width: 100%;
			margin-top: auto;
		}

		&-button {
			width: 100%;
			display: block;
			box-sizing: border-box;
			cursor: pointer;
			border: 0 none;
			white-space: nowrap;
		}
	}

	&-sub-form {
		display: flex;
		height: 100%;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-end;
		margin: 0;

		&-donation {
			.wmde-banner-form-button-container {
				margin-top: 0;
			}
		}
	}
}
</style>
