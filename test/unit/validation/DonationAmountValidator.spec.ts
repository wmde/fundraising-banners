import { beforeEach, describe, expect, test } from 'vitest';
import { Validity } from '@src/utils/FormModel/Validity';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';
import { useFormModel } from '@src/utils/FormModel/services/useFormModel';
import { DonationFormValidator } from '@src/validation/DonationFormValidator';

describe( 'DonationAmountValidator', () => {

	const model = useFormModel();

	// The model values are in the global scope, and they need to be reset before each test
	beforeEach( () => {
		model.interval.value = '';
		model.intervalValidity.value = Validity.Unset;
		model.selectedAmount.value = '';
		model.amountValidity.value = AmountValidity.Unset;
		model.customAmount.value = '';
		model.paymentMethod.value = '';
		model.paymentMethodValidity.value = Validity.Unset;
		model.addressType.value = '';
		model.addressTypeValidity.value = Validity.Unset;
	} );

	test.each( [
		[ '', '', AmountValidity.Unset ],
		[ '', '0', AmountValidity.TooLow ],
		[ '', '0.99', AmountValidity.TooLow ],
		[ '', '1', AmountValidity.Valid ],
		[ '100', '', AmountValidity.Valid ],
		[ '', '99999.99', AmountValidity.Valid ],
		[ '', '100000', AmountValidity.TooHigh ]
	] )( 'sets amount validity during validation', (
		amountInputInEuros: string,
		customAmountInputInEuros: string,
		expectedAmountValidity: AmountValidity
	) => {
		model.selectedAmount.value = amountInputInEuros;
		model.customAmount.value = customAmountInputInEuros;
		const validator = new DonationFormValidator( model );

		validator.isValid();

		expect( model.amountValidity.value ).toBe( expectedAmountValidity );
	} );
} );
