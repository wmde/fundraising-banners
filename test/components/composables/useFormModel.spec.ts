import { beforeEach, describe, expect, it, test } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { nextTick } from 'vue';
import { Intervals, RecurringIntervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { Validity } from '@src/utils/FormModel/Validity';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';
import { resetFormModel } from '@test/resetFormModel';

const model = useFormModel();

describe( 'useFormModel', () => {

	// The model values are in the global scope, and they need to be reset before each test
	beforeEach( () => resetFormModel( model ) );

	it( 'should clear the address type when payment method is set to Direct debit and address type was NO', async function () {

		model.addressType.value = AddressTypes.ANONYMOUS.value;
		model.paymentMethod.value = PaymentMethods.DIRECT_DEBIT.value;

		await nextTick();
		expect( model.addressType.value ).toBe( '' );
	} );

	it( 'should NOT change the address type when payment method is set to Bank transfer and address type was NO', async function () {

		model.addressType.value = AddressTypes.ANONYMOUS.value;
		model.paymentMethod.value = PaymentMethods.BANK_TRANSFER.value;

		await nextTick();
		expect( model.addressType.value ).toBe( AddressTypes.ANONYMOUS.value );
	} );

	it( 'disables all recurring intervals if payment method is SOFORT', function () {
		model.paymentMethod.value = PaymentMethods.SOFORT.value;

		expect( model.disabledIntervals.value ).toBe( RecurringIntervals );
	} );

	it( 'allows all intervals for any other payment method than SOFORT', function () {
		expect( model.disabledIntervals.value ).toEqual( [] );

		model.paymentMethod.value = PaymentMethods.CREDIT_CARD.value;

		expect( model.disabledIntervals.value ).toEqual( [] );
	} );

	it( 'disables SOFORT when the interval is set an recurring interval', function () {
		model.interval.value = Intervals.QUARTERLY.value;

		expect( model.disabledPaymentMethods.value ).toEqual( [ PaymentMethods.SOFORT.value ] );
	} );

	it( 'allows all payment methods on one time interval', function () {
		model.interval.value = Intervals.ONCE.value;

		expect( model.disabledPaymentMethods.value ).toEqual( [] );
	} );

	it( 'disables anonymous address type when direct debit was selected', function () {
		model.paymentMethod.value = PaymentMethods.DIRECT_DEBIT.value;

		expect( model.disabledAddressTypes.value ).toEqual( [ AddressTypes.ANONYMOUS.value ] );
	} );

	it( 'allows all address types when any other payment type than direct debit was selected', function () {
		model.paymentMethod.value = PaymentMethods.PAYPAL.value;

		expect( model.disabledAddressTypes.value ).toEqual( [] );
	} );

	it( 'should clear custom amount when amount changes', async function () {
		model.selectedAmount.value = '';
		model.customAmount.value = '999';
		await nextTick();

		model.selectedAmount.value = '500';
		await nextTick();

		expect( model.customAmount.value ).toEqual( '' );
	} );

	it( 'should clear amount when custom amount changes', async function () {
		model.selectedAmount.value = '555';
		model.customAmount.value = '';
		await nextTick();

		model.customAmount.value = '500';
		await nextTick();

		expect( model.selectedAmount.value ).toEqual( '' );
	} );

	test.each( [
		[ '555', 555 ],
		[ '555,32', 555.32 ],
		[ '555.45', 555.45 ],
		[ '1234.6767674957234', 1234.6767674957234 ],
		[ '1234,6767674957234', 1234.6767674957234 ],
		[ '1234,67.5656.', 1234675656 ],
		[ '1234,67.5656', 123467.5656 ],
		[ '1234,675,656', 1234675.656 ]
	] )( 'should set numericAmount when amount changes', function ( inputAmount: string, expectedNumericAmount: number ) {
		model.selectedAmount.value = inputAmount;

		expect( model.numericAmount.value ).toEqual( expectedNumericAmount );
	} );

	it( 'sets Invalid paymentMethodValidity to valid when a payment method is selected', async () => {
		model.paymentMethodValidity.value = Validity.Invalid;

		model.paymentMethod.value = 'PPL';
		await nextTick();

		expect( model.paymentMethodValidity.value ).toBe( Validity.Valid );
	} );

	it( 'does not set Unset paymentMethodValidity to Valid when a payment method is selected', async () => {
		model.paymentMethodValidity.value = Validity.Unset;

		model.paymentMethod.value = 'PPL';
		await nextTick();

		expect( model.paymentMethodValidity.value ).toBe( Validity.Unset );
	} );

	it( 'sets Invalid intervalValidity to valid when an interval is selected', async () => {
		model.intervalValidity.value = Validity.Invalid;

		model.interval.value = '1';
		await nextTick();

		expect( model.intervalValidity.value ).toBe( Validity.Valid );
	} );

	it( 'does not set Unset paymentMethodValidity to Valid when a payment method is selected', async () => {
		model.intervalValidity.value = Validity.Unset;

		model.interval.value = '1';
		await nextTick();

		expect( model.intervalValidity.value ).toBe( Validity.Unset );
	} );

	test.each( [
		[ AmountValidity.Unset, AmountValidity.Unset ],
		[ AmountValidity.Invalid, AmountValidity.Valid ],
		[ AmountValidity.TooHigh, AmountValidity.Valid ],
		[ AmountValidity.TooLow, AmountValidity.Valid ]
	] )( 'sets correct amountValidity when an amount is selected', async ( initialValidity: AmountValidity, expectedValidity: AmountValidity ) => {
		model.amountValidity.value = initialValidity;

		model.selectedAmount.value = '5';
		await nextTick();

		expect( model.amountValidity.value ).toBe( expectedValidity );
	} );

	test.each( [
		[ AmountValidity.Unset, AmountValidity.Unset ],
		[ AmountValidity.Invalid, AmountValidity.Valid ],
		[ AmountValidity.TooHigh, AmountValidity.Valid ],
		[ AmountValidity.TooLow, AmountValidity.Valid ]
	] )( 'sets correct amountValidity when a custom amount is entered', async ( initialValidity: AmountValidity, expectedValidity: AmountValidity ) => {
		model.amountValidity.value = initialValidity;

		model.customAmount.value = '5';
		await nextTick();

		expect( model.amountValidity.value ).toBe( expectedValidity );
	} );
} );
