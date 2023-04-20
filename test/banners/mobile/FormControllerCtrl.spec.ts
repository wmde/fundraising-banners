import { describe, vi, it, expect, beforeEach } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import {
	FormControllerCtrl,
	MAIN_DONATION_INDEX,
	UPGRADE_TO_YEARLY_INDEX
} from '../../../banners/mobile/FormControllerCtrl';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { resetFormModel } from '@test/resetFormModel';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';

describe( 'FormControllerCtrl', () => {
	const formModel = useFormModel();
	let pageScroller: PageScroller;

	beforeEach( () => {
		resetFormModel( formModel );
		pageScroller = {
			scrollIntoView: vi.fn(),
			scrollToTop: vi.fn()
		};
	} );

	describe( 'Donation form', () => {
		const pageIndex = MAIN_DONATION_INDEX;

		it( 'should submit when recurring interval is selected', () => {
			const controller = new FormControllerCtrl( formModel, pageScroller );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			formModel.interval.value = Intervals.BIANNUAL.value;
			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should submit when the payment type is sofort', () => {

			const controller = new FormControllerCtrl( formModel, pageScroller );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			formModel.interval.value = Intervals.ONCE.value;
			formModel.paymentMethod.value = PaymentMethods.SOFORT.value;
			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should go to next page when interval is "once"', () => {
			const controller = new FormControllerCtrl( formModel, pageScroller );
			const onNext = vi.fn();
			controller.onNext( onNext );

			formModel.interval.value = Intervals.ONCE.value;
			controller.submitStep( { pageIndex } );

			expect( onNext ).toHaveBeenCalledOnce();
		} );

		it( 'should scroll to top when submitted', () => {
			const controller = new FormControllerCtrl( formModel, pageScroller );
			const onNext = vi.fn();
			controller.onNext( onNext );

			formModel.interval.value = Intervals.ONCE.value;
			controller.submitStep( { pageIndex } );

			expect( pageScroller.scrollIntoView ).toHaveBeenCalledOnce();
			expect( pageScroller.scrollIntoView ).toHaveBeenCalledWith( '.wmde-banner-form' );
		} );

	} );

	describe( 'Upgrade to yearly', () => {
		const pageIndex = UPGRADE_TO_YEARLY_INDEX;

		it( 'should submit tracking data for yearly interval', function () {
			const controller = new FormControllerCtrl( formModel, pageScroller );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.YEARLY.value } } );

			expect( onSubmit ).toHaveBeenCalledOnce();
			expect( onSubmit ).toHaveBeenCalledWith( 'submit-recurring' );
		} );

		it( 'should submit tracking data for "once" interval', function () {
			const controller = new FormControllerCtrl( formModel, pageScroller );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.ONCE.value } } );

			expect( onSubmit ).toHaveBeenCalledOnce();
			expect( onSubmit ).toHaveBeenCalledWith( 'submit-non-recurring' );
		} );

		it( 'should set interval to once on previous', () => {
			const controller = new FormControllerCtrl( formModel, pageScroller );
			const onPrevious = vi.fn();
			controller.onPrevious( onPrevious );
			formModel.interval.value = Intervals.YEARLY.value;

			controller.previous( { pageIndex } );

			expect( formModel.interval.value ).toBe( Intervals.ONCE.value );
			expect( onPrevious ).toHaveBeenCalledOnce();
		} );

		it( 'should set interval to yearly and go to previous form on "next"', () => {
			const controller = new FormControllerCtrl( formModel, pageScroller );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );
			formModel.interval.value = Intervals.ONCE.value;

			controller.next( { pageIndex } );

			expect( formModel.interval.value ).toBe( Intervals.YEARLY.value );
			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( MAIN_DONATION_INDEX );
		} );
	} );

} );
