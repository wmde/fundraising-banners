import { describe, vi, it, expect, beforeEach } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import { FormControllerCtrl } from '../../../../banners/desktop/FormControllerCtrl';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { resetFormModel } from '@test/resetFormModel';

describe( 'FormControllerCtrl', () => {
	const formModel = useFormModel();

	beforeEach( () => resetFormModel( formModel ) );

	describe( 'Donation form', () => {
		const pageIndex = 0;

		it( 'should submit when recurring interval is selected', () => {
			const controller = new FormControllerCtrl( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			formModel.interval.value = Intervals.BIANNUAL.value;
			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should submit when the payment type is sofort', () => {

			const controller = new FormControllerCtrl( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			formModel.interval.value = Intervals.ONCE.value;
			formModel.paymentMethod.value = PaymentMethods.SOFORT.value;
			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should go to next page when interval is "once"', () => {
			const controller = new FormControllerCtrl( formModel );
			const onNext = vi.fn();
			controller.onNext( onNext );

			formModel.interval.value = Intervals.ONCE.value;
			controller.submitStep( { pageIndex } );

			expect( onNext ).toHaveBeenCalledOnce();
		} );

	} );

	describe( 'Upgrade to yearly', () => {
		const pageIndex = 1;

		it( 'should submit tracking data for yearly interval', function () {
			const controller = new FormControllerCtrl( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.YEARLY.value } } );

			expect( onSubmit ).toHaveBeenCalledOnce();
			expect( onSubmit ).toHaveBeenCalledWith( 'submit-recurring' );
		} );

		it( 'should submit tracking data for "once" interval', function () {
			const controller = new FormControllerCtrl( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.ONCE.value } } );

			expect( onSubmit ).toHaveBeenCalledOnce();
			expect( onSubmit ).toHaveBeenCalledWith( 'submit-non-recurring' );
		} );
	} );

} );
