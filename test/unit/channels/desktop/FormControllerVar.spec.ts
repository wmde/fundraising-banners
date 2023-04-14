import { describe, vi, it, expect, beforeEach } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import { FormControllerVar } from '../../../../banners/desktop/FormControllerVar';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { resetFormModel } from '@test/resetFormModel';
import { FormControllerCtrl } from '../../../../banners/desktop/FormControllerCtrl';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { Validity } from '@src/utils/FormModel/Validity';

describe( 'FormControllerVar', () => {
	const formModel = useFormModel();

	beforeEach( () => resetFormModel( formModel ) );

	describe( 'Donation form', () => {
		const pageIndex = 0;

		it( 'should go to address page when recurring interval is selected', () => {
			const controller = new FormControllerVar( formModel );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );

			formModel.interval.value = Intervals.BIANNUAL.value;
			controller.submitStep( { pageIndex } );

			expect( onGoToStep ).toHaveBeenCalledOnce();
		} );

		it( 'should go to address page when the payment type is sofort', () => {
			const controller = new FormControllerVar( formModel );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );

			formModel.interval.value = Intervals.ONCE.value;
			formModel.paymentMethod.value = PaymentMethods.SOFORT.value;
			controller.submitStep( { pageIndex } );

			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( 3 );
		} );

		it( 'should go to next page when interval is "once"', () => {
			const controller = new FormControllerVar( formModel );
			const onNext = vi.fn();
			controller.onNext( onNext );

			formModel.interval.value = Intervals.ONCE.value;
			controller.submitStep( { pageIndex } );

			expect( onNext ).toHaveBeenCalledOnce();
		} );

	} );

	describe( 'Upgrade to yearly', () => {
		const pageIndex = 1;

		it( 'should go to address page when an interval was selected', function () {
			const controller = new FormControllerVar( formModel );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.YEARLY.value } } );

			expect( onGoToStep ).toHaveBeenCalledOnce();
		} );

		it( 'should set interval to once on previous', () => {
			const controller = new FormControllerCtrl( formModel );
			const onPrevious = vi.fn();
			controller.onPrevious( onPrevious );
			formModel.interval.value = Intervals.YEARLY.value;

			controller.previous( { pageIndex } );

			expect( formModel.interval.value ).toBe( Intervals.ONCE.value );
			expect( onPrevious ).toHaveBeenCalledOnce();
		} );
	} );

	describe( 'New custom amount', () => {
		const pageIndex = 2;

		it( 'should go to next page when submitting', function () {
			const controller = new FormControllerVar( formModel );
			const onNext = vi.fn();
			controller.onNext( onNext );

			controller.submitStep( { pageIndex, extraData: { newCustomAmount: '42.23' } } );

			expect( onNext ).toHaveBeenCalledOnce();
		} );
	} );

	describe( 'Address form', () => {
		const pageIndex = 3;

		it( 'should submit', () => {
			const controller = new FormControllerVar( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should go to donation form when "previous" is called', () => {
			const controller = new FormControllerVar( formModel );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );

			controller.previous( { pageIndex } );

			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( 0 );
		} );

		it( 'should unset address type in the model when "previous" is called', () => {
			const controller = new FormControllerVar( formModel );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );
			formModel.addressType.value = AddressTypes.EMAIL.value;

			controller.previous( { pageIndex } );

			expect( formModel.addressType.value ).toBe( '' );
			expect( formModel.addressTypeValidity.value ).toBe( Validity.Unset );
		} );

	} );

} );
