<template>
	<form
		action="formUrl"
		method="post"
		class="wmde-banner-form"
		@click="onFormInteraction"
		@submit="validate"
	>
		<fieldset class="wmde-banner-form-field-group">
			<legend class="wmde-banner-form-field-group-legend">{{ $translate( 'intervals-header' ) }}</legend>
			<SelectGroup
				fieldname="select-interval"
				:selectionItems="formItems.intervals"
				:isValid="isValidOrUnset( intervalValidity )"
				:errorMessage="$translate( 'no-interval-message' )"
				:currentValue="paymentInterval"
				@selected="e => paymentInterval.value = e.target.value"  }
				:disabledOptions="disabledIntervals"
			/>
		</fieldset>

	</form>
</template>

<script setup lang="ts">

import { inject, ref } from 'vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder';

interface Props {
	formUrl: string;
}

type Validity = 'valid' | 'invalid' | 'unset';

defineProps<Props>();

const paymentInterval = ref<string>( '' );
const disabledIntervals = ref<string[]>( [] );
const intervalValidity = ref<Validity>( 'unset' );

const formItems: DonationFormItems = inject( 'formItems' );

// TODO call tracker
const onFormInteraction = (): void => {};

// TODO implement validation based on form items
const validate = (): void => {};

const isValidOrUnset = ( validity: Validity ): boolean => {
	return validity === 'valid' || validity === 'unset';
};

</script>

<style lang="scss">

</style>
