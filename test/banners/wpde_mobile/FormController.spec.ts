import { describe, vi, it, expect, beforeEach } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import { FormController, MAIN_DONATION_INDEX, UPGRADE_TO_YEARLY_INDEX } from '../../../banners/wpde_mobile/FormController';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { resetFormModel } from '@test/resetFormModel';
import { TrackerSpy } from '@test/fixtures/TrackerSpy';
import { UpgradeToYearlyFormPageShownEvent } from '@src/tracking/events/UpgradeToYearlyFormPageShownEvent';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';

describe( 'FormController', () => {
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
			const tracker = new TrackerSpy();
			const controller = new FormController( formModel, pageScroller, tracker );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			formModel.interval.value = Intervals.BIANNUAL.value;
			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should submit when the payment type is sofort', () => {
			const tracker = new TrackerSpy();
			const controller = new FormController( formModel, pageScroller, tracker );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			formModel.interval.value = Intervals.ONCE.value;
			formModel.paymentMethod.value = PaymentMethods.SOFORT.value;
			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should go to next page when interval is "once"', () => {
			const tracker = new TrackerSpy();
			const controller = new FormController( formModel, pageScroller, tracker );
			const onNext = vi.fn();
			controller.onNext( onNext );

			formModel.interval.value = Intervals.ONCE.value;
			controller.submitStep( { pageIndex } );

			expect( tracker.hasTrackedEvent( UpgradeToYearlyFormPageShownEvent.EVENT_NAME ) ).toBe( true );
			expect( onNext ).toHaveBeenCalledOnce();
		} );

	} );

	describe( 'Upgrade to yearly', () => {
		const pageIndex = UPGRADE_TO_YEARLY_INDEX;

		it( 'should submit tracking data for yearly interval', function () {
			const tracker = new TrackerSpy();
			const controller = new FormController( formModel, pageScroller, tracker );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.YEARLY.value } } );

			expect( onSubmit ).toHaveBeenCalledOnce();
			expect( onSubmit ).toHaveBeenCalledWith( 'submit-recurring' );
		} );

		it( 'should submit tracking data for "once" interval', function () {
			const tracker = new TrackerSpy();
			const controller = new FormController( formModel, pageScroller, tracker );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.ONCE.value } } );

			expect( onSubmit ).toHaveBeenCalledOnce();
			expect( onSubmit ).toHaveBeenCalledWith( 'submit-non-recurring' );
		} );

		it( 'should set interval to once on previous', () => {
			const tracker = new TrackerSpy();
			const controller = new FormController( formModel, pageScroller, tracker );
			const onPrevious = vi.fn();
			controller.onPrevious( onPrevious );
			formModel.interval.value = Intervals.YEARLY.value;

			controller.previous( { pageIndex } );

			expect( formModel.interval.value ).toBe( Intervals.ONCE.value );
			expect( onPrevious ).toHaveBeenCalledOnce();
		} );
	} );

} );
