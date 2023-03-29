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
				:field-name="'select-interval'"
				:selectionItems="formItems.intervals"
				:isValid="isValidOrUnset( intervalValidity.value )"
				:errorMessage="$translate( 'no-interval-message' )"
				v-model="interval"
				:disabledOptions="disabledIntervals"
			/>
		</fieldset>

		<fieldset class="wmde-banner-form-field-group">
			<legend class="wmde-banner-form-field-group-legend">{{ $translate( 'amounts-header' ) }}</legend>
			<SelectGroup
				fieldName="select-amount"
				:selectionItems="formItems.amounts"
				:isValid="isValidOrUnset( amountValidity.value )"
				:errorMessage="'amountMessage( amountValidity, Translations )'"
				v-model="amount"
				>
				<SelectCustomAmount
					fieldname="select-amount"
					v-model="customAmount"
					@blur="validateCustomAmount"
					:placeholder="customAmountPlaceholder"
					/>
			</SelectGroup>
		</fieldset>

	</form>
</template>

<script setup lang="ts">

import { inject } from 'vue';
import SelectGroup from '@src/components/DonationForm/SubComponents/SelectGroup.vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { useFormModel } from '@src/utils/FormModel/services/useFormModel';
import { Validity } from '@src/utils/FormModel/Validity';
import SelectCustomAmount from '@src/components/DonationForm/SubComponents/SelectCustomAmount.vue';

interface Props {
	formUrl: string;
	customAmountPlaceholder: string;
}

defineProps<Props>();

const formItems: DonationFormItems = inject( 'formItems' );
const formModel = useFormModel();

// TODO call tracker
const onFormInteraction = (): void => {};

// TODO implement validation based on form items
const validate = (): void => {};

const isValidOrUnset = ( validity: Validity ): boolean => {
	return validity === Validity.Valid || validity === Validity.Unset;
};

const {
	interval, intervalValidity, disabledIntervals,
	amount, customAmount, amountValidity
} = formModel;

const validateCustomAmount = (): void => {};

</script>

<style lang="scss">
.wmde-banner {
	&-form {
		display: flex;
		height: 100%;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-end;
		margin: 0;

		&-field-group {
			border: 0;
			margin: 0;
			display: block;

			&-legend {
				width: 100%;
				position: relative;
				padding: 0;
			}
		}

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
}
</style>
