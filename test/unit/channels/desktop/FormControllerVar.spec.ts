import { describe, vi, it, expect, beforeEach } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import { FormControllerVar } from '../../../../banners/desktop/FormControllerVar';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { resetFormModel } from '@test/resetFormModel';

describe( 'FormControllerVar', () => {
	const formModel = useFormModel();

	beforeEach( () => resetFormModel( formModel ) );

	describe( 'Donation form', () => {
		const pageIndex = 0;

		it.todo( 'should submit when recurring interval is selected and payment is direct debit', () => {
			const controller = new FormControllerVar( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			formModel.interval.value = Intervals.BIANNUAL.value;
			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it.todo( 'should go to address page when recurring interval is selected and payment is not direct debit', () => {
			const controller = new FormControllerVar( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			formModel.interval.value = Intervals.BIANNUAL.value;
			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should to address page when the payment type is sofort', () => {

			const controller = new FormControllerVar( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			formModel.interval.value = Intervals.ONCE.value;
			formModel.paymentMethod.value = PaymentMethods.SOFORT.value;
			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it.todo( 'should go to next page when interval is "once"', () => {
			const controller = new FormControllerVar( formModel );
			const onNext = vi.fn();
			controller.onNext( onNext );

			formModel.interval.value = Intervals.ONCE.value;
			controller.submitStep( { pageIndex } );

			// TODO we might not watch onNext but gotopage
			expect( onNext ).toHaveBeenCalledOnce();
		} );

	} );

	describe( 'Upgrade to yearly', () => {
		const pageIndex = 1;

		it.todo( 'should go to address page when an interval was selected', function () {
			const controller = new FormControllerVar( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.YEARLY.value } } );

			expect( onSubmit ).toHaveBeenCalledOnce();
			expect( onSubmit ).toHaveBeenCalledWith( 'submit-recurring' );
		} );

		it( 'should call "onPrevious" when going to previous', () => {
			const controller = new FormControllerVar( formModel );
			const onPrevious = vi.fn();
			controller.onPrevious( onPrevious );

			controller.previous( { pageIndex } );

			expect( onPrevious ).toHaveBeenCalledOnce();
		} );

		it.todo( 'should submit when payment is direct debit' );
	} );

	describe( 'New custom amount', () => {
		const pageIndex = 2;

		it( 'should go to next page when payment type is not direct debit', function () {
			const controller = new FormControllerVar( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex, extraData: { newCustomAmount: '42.23' } } );

			expect( onSubmit ).toHaveBeenCalledOnce();
			expect( onSubmit ).toHaveBeenCalledWith( 'submit-different-amount' );
		} );

		it.todo( 'should submit when payment is direct debit' );
	} );

	describe( 'Address form', () => {

		it.todo( 'should submit tracking data when address was selected' );
		it.todo( 'should submit tracking data when no address was selected' );
		it.todo( 'should submit modified interval when original interval is "once" and user has chosen recurring interval' );
		// eslint-disable-next-line max-len
		it.todo( 'should submit modified interval and custom amount when original interval is "once" and user has chosen recurring interval and user has visited custom amount form' );
		it.todo( 'should go to donation form when "previous" is called and interval is recurring' );
		it.todo( 'should go to custom amount form when "previous" is called and interval is "once" and user has visited custom amount form' );
		it.todo( 'should go to upsell form when "previous" is called and interval is "once" and user has not visited custom amount form' );

	} );

} );
