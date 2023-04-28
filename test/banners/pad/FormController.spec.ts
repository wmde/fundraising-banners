import { describe, vi, it, expect, beforeEach } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import { FormController, MAIN_DONATION_INDEX, UPGRADE_TO_YEARLY_INDEX } from '../../../banners/pad/FormController';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { resetFormModel } from '@test/resetFormModel';

describe( 'FormController', () => {
	const formModel = useFormModel();

	beforeEach( () => resetFormModel( formModel ) );

	describe( 'Donation form', () => {
		const pageIndex = MAIN_DONATION_INDEX;

		it( 'should submit when recurring interval is selected', () => {
			const controller = new FormController( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			formModel.interval.value = Intervals.BIANNUAL.value;
			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should submit when the payment type is sofort', () => {

			const controller = new FormController( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			formModel.interval.value = Intervals.ONCE.value;
			formModel.paymentMethod.value = PaymentMethods.SOFORT.value;
			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should go to next page when interval is "once"', () => {
			const controller = new FormController( formModel );
			const onNext = vi.fn();
			controller.onNext( onNext );

			formModel.interval.value = Intervals.ONCE.value;
			controller.submitStep( { pageIndex } );

			expect( onNext ).toHaveBeenCalledOnce();
		} );

	} );

	describe( 'Upgrade to yearly', () => {
		const pageIndex = UPGRADE_TO_YEARLY_INDEX;

		it( 'should submit tracking data for yearly interval', function () {
			const controller = new FormController( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.YEARLY.value } } );

			expect( onSubmit ).toHaveBeenCalledOnce();
			expect( onSubmit ).toHaveBeenCalledWith( 'submit-recurring' );
		} );

		it( 'should submit tracking data for "once" interval', function () {
			const controller = new FormController( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.ONCE.value } } );

			expect( onSubmit ).toHaveBeenCalledOnce();
			expect( onSubmit ).toHaveBeenCalledWith( 'submit-non-recurring' );
		} );

		it( 'should set interval to once on previous', () => {
			const controller = new FormController( formModel );
			const onPrevious = vi.fn();
			controller.onPrevious( onPrevious );
			formModel.interval.value = Intervals.YEARLY.value;

			controller.previous( { pageIndex } );

			expect( formModel.interval.value ).toBe( Intervals.ONCE.value );
			expect( onPrevious ).toHaveBeenCalledOnce();
		} );
	} );

} );
