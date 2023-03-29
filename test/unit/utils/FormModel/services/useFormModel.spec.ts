import { describe, expect, it } from 'vitest';
import { useFormModel } from '@src/utils/FormModel/services/useFormModel';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { nextTick } from 'vue';
import { Intervals, RecurringIntervals } from '@src/utils/FormItemsBuilder/fields/Intervals';

describe( 'useFormModel', () => {
	it( 'should clear the address type when payment method is set to Direct debit and address type was NO', async function () {
		const model = useFormModel();

		model.addressType.value = AddressTypes.NO.value;
		model.paymentMethod.value = PaymentMethods.DIRECT_DEBIT.value;

		await nextTick();
		expect( model.addressType.value ).toBe( '' );
	} );

	it( 'should NOT change the address type when payment method is set to Bank transfer and address type was NO', async function () {
		const model = useFormModel();

		model.addressType.value = AddressTypes.NO.value;
		model.paymentMethod.value = PaymentMethods.BANK_TRANSFER.value;

		await nextTick();
		expect( model.addressType.value ).toBe( AddressTypes.NO.value );
	} );

	it( 'disables all recurring intervals if payment method is SOFORT', function () {
		const model = useFormModel();
		model.paymentMethod.value = PaymentMethods.SOFORT.value;

		expect( model.disabledIntervals.value ).toBe( RecurringIntervals );
	} );

	it( 'allows all intervals for any other payment method than SOFORT', function () {
		const model = useFormModel();

		expect( model.disabledIntervals.value ).toEqual( [] );

		model.paymentMethod.value = PaymentMethods.CREDIT_CARD.value;

		expect( model.disabledIntervals.value ).toEqual( [] );
	} );

	it( 'disables SOFORT when the interval is set an recurring interval', function () {
		const model = useFormModel();
		model.interval.value = Intervals.QUARTERLY.value;

		expect( model.disabledPaymentMethods.value ).toEqual( [ PaymentMethods.SOFORT.value ] );
	} );

	it( 'allows all payment methods on one time interval', function () {
		const model = useFormModel();
		model.interval.value = Intervals.ONCE.value;

		expect( model.disabledPaymentMethods.value ).toEqual( [] );
	} );

	it( 'disables anonymous address type when direct debit was selected', function () {
		const model = useFormModel();
		model.paymentMethod.value = PaymentMethods.DIRECT_DEBIT.value;

		expect( model.disabledAddressTypes.value ).toEqual( [ AddressTypes.NO.value ] );
	} );

	it( 'allows all address types when any other payment type than direct debit was selected', function () {
		const model = useFormModel();
		model.paymentMethod.value = PaymentMethods.PAYPAL.value;

		expect( model.disabledAddressTypes.value ).toEqual( [] );
	} );

	it( 'should clear custom amount when amount changes', async function () {
		const model = useFormModel();
		model.amount.value = '';
		model.customAmount.value = '999';
		await nextTick();

		model.amount.value = '500';
		await nextTick();

		expect( model.customAmount.value ).toEqual( '' );
	} );

	it( 'should clear amount when custom amount changes', async function () {
		const model = useFormModel();
		model.amount.value = '555';
		model.customAmount.value = '';
		await nextTick();

		model.customAmount.value = '500';
		await nextTick();

		expect( model.amount.value ).toEqual( '' );
	} );
} );
