<template>
	<div class="wmde-banner-form wmde-banner-form-multi-step keen-slider" ref="container">
		<template v-for="( form, idx ) in forms" :key="idx">
			<div class="keen-slider__slide wmde-banner-form-page" :class="{ 'wmde-banner-form-page--current': currentFormPage === idx }">
				<component
					:is="form"
					:page-number="idx"
					@submit="onSubmit"
					@next="onNext"
					@previous="onPrevious"
				/>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useKeenSlider } from 'keen-slider/vue';
import { FormController } from '@src/utils/FormController/FormController';
import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';

const currentFormPage = ref<number>( 0 );

interface Props {
	showErrorScrollLink?: boolean;
	formController: FormController;
	forms: Array<any>;
}

const props = withDefaults( defineProps<Props>(), {
	showErrorScrollLink: false
} );

const [ container, slider ] = useKeenSlider( {
	initial: 0
} );

const onSubmit = ( payload: FormSubmitData ): void => {
	payload.event.preventDefault();
	props.formController.submitStep( payload );
};

const onPrevious = ( payload: FormSubmitData ): void => {
	props.formController.previous( payload );
};

const onNext = ( payload: FormSubmitData ): void => {
	props.formController.next( payload );
};

props.formController.onNext( () => {
	currentFormPage.value = currentFormPage.value + 1;
	slider.value.next();
} );

props.formController.onPrevious( () => {
	currentFormPage.value = currentFormPage.value - 1;
	slider.value.prev();
} );

props.formController.onGoToStep( ( pageNumber: number ) => {
	currentFormPage.value = pageNumber;
	slider.value.moveToIdx( pageNumber );
} );

props.formController.onSubmit( () => {} );

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
		width: 100%; /* For IE11 */
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
