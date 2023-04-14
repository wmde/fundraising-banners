import { beforeEach, describe, expect, it, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import AddressTypeForm from '@src/components/DonationForm/Forms/AddressTypeForm.vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { resetFormModel } from '@test/resetFormModel';
import { useFormModel } from '@src/components/composables/useFormModel';
import { nextTick } from 'vue';
import { FormItem } from '@src/utils/FormItemsBuilder/FormItem';
import { Validity } from '@src/utils/FormModel/Validity';

const formModel = useFormModel();

describe( 'AddressTypeForm.vue', () => {

	const translator = ( key: string ): string => key;

	const formItems: DonationFormItems = {
		addressType: [ AddressTypes.NO, AddressTypes.EMAIL, AddressTypes.FULL ],
		amounts: [
			{ value: '1', label: '€1', className: 'amount-1' },
			{ value: '5', label: '€5', className: 'amount-5' }
		],
		intervals: [ Intervals.ONCE, Intervals.MONTHLY ],
		paymentMethods: [ PaymentMethods.PAYPAL, PaymentMethods.CREDIT_CARD, PaymentMethods.DIRECT_DEBIT ]
	};

	let wrapper: VueWrapper<any>;

	beforeEach( () => {
		resetFormModel( formModel );

		wrapper = mount( AddressTypeForm, {
			props: {
				pageIndex: 4444
			},
			global: {
				mocks: {
					$translate: translator
				},
				provide: {
					translator: { translate: translator },
					formItems: formItems
				}
			}
		} );
	} );

	it( 'should change the form model when an address option is selected', async () => {
		await wrapper.find( '.address-type-email input' ).trigger( 'change' );

		expect( formModel.addressType.value ).toBe( AddressTypes.EMAIL.value );
		expect( formModel.addressTypeValidity.value ).toBe( Validity.Valid );
	} );

	it( 'should show error message on submit when nothing was selected', async () => {
		await wrapper.trigger( 'submit' );

		expect( wrapper.find( '.wmde-banner-select-group-container' ).classes() )
			.toContain( 'wmde-banner-select-group-container--with-error' );
	} );

	it( 'should hide error message when user selects an option', async () => {
		await wrapper.trigger( 'submit' );
		await wrapper.find( '.address-type-email input' ).trigger( 'change' );

		expect( wrapper.find( '.wmde-banner-select-group-container' ).classes() )
			.not.toContain( 'wmde-banner-select-group-container--with-error' );
	} );

	it( 'should show direct debit hint when direct debit was selected on donation form page', async () => {
		formModel.paymentMethod.value = PaymentMethods.DIRECT_DEBIT.value;
		await nextTick();

		expect( wrapper.find( '.wmde-banner-form-address-type-notice' ).text() ).toBe( 'address-type-notice-direct-debit' );

		formModel.paymentMethod.value = PaymentMethods.BANK_TRANSFER.value;
		await nextTick();

		expect( wrapper.find( '.wmde-banner-form-address-type-notice' ).text() ).toBe( '' );
	} );

	test.each( [
		[ PaymentMethods.BANK_TRANSFER, 'submit-label-bank-transfer' ],
		[ PaymentMethods.CREDIT_CARD, 'submit-label-credit-card' ],
		[ PaymentMethods.SOFORT, 'submit-label-sofort' ],
		[ PaymentMethods.PAYPAL, 'submit-label-paypal' ],
		[ PaymentMethods.DIRECT_DEBIT, 'submit-label-default' ]
	] )( 'should set the button label according to payment type when anonymous address type is selected', async ( paymentType: FormItem, expectedButtonLabel: string ) => {
		formModel.addressType.value = AddressTypes.NO.value;
		formModel.paymentMethod.value = paymentType.value;
		await nextTick();

		expect( wrapper.find( '.wmde-banner-form-button' ).text() ).toBe( expectedButtonLabel );
	} );

	it( 'should set the button label to default when when user wants to provide an address', async () => {
		formModel.addressType.value = AddressTypes.FULL.value;
		formModel.paymentMethod.value = PaymentMethods.PAYPAL.value;
		await nextTick();

		expect( wrapper.find( '.wmde-banner-form-button' ).text() ).toBe( 'submit-label-default' );
	} );

	it( 'should emit "previous" event when back button is clicked', async () => {
		await wrapper.find( '.previous' ).trigger( 'click' );

		expect( wrapper.emitted( 'previous' ).length ).toBe( 1 );
		expect( wrapper.emitted( 'previous' )[ 0 ][ 0 ] ).toEqual( { pageIndex: 4444 } );
	} );

	it( 'should emit "submit" event when user selects a valid address option and submits', async () => {
		await wrapper.find( '.address-type-email input' ).trigger( 'change' );
		await wrapper.trigger( 'submit' );

		expect( wrapper.emitted( 'submit' ).length ).toBe( 1 );
	} );

} );
