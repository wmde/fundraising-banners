import { describe, vi, it, expect, beforeEach } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import {
	FormControllerVar,
	ADDRESS_TYPES_INDEX,
	MAIN_DONATION_INDEX,
	UPGRADE_TO_YEARLY_INDEX
} from '../../../banners/mobile/FormControllerVar';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { resetFormModel } from '@test/resetFormModel';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { TrackerSpy } from '@test/fixtures/TrackerSpy';
import { UpgradeToYearlyFormPageShownEvent } from '@src/tracking/events/UpgradeToYearlyFormPageShownEvent';
import { AddressTypeFormPageShownEvent } from '@src/tracking/events/AddressTypeFormPageShownEvent';

describe( 'FormControllerVar', () => {
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

		it( 'should go straight to address form page when recurring interval is selected', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, pageScroller, tracker );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );

			formModel.interval.value = Intervals.BIANNUAL.value;
			controller.submitStep( { pageIndex } );

			expect( tracker.hasTrackedEvent( AddressTypeFormPageShownEvent.EVENT_NAME ) ).toBe( true );
			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( ADDRESS_TYPES_INDEX );
		} );

		it( 'should go straight to address form page when the payment type is sofort', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, pageScroller, tracker );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );

			formModel.interval.value = Intervals.ONCE.value;
			formModel.paymentMethod.value = PaymentMethods.SOFORT.value;
			controller.submitStep( { pageIndex } );

			expect( tracker.hasTrackedEvent( AddressTypeFormPageShownEvent.EVENT_NAME ) ).toBe( true );
			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( ADDRESS_TYPES_INDEX );
		} );

		it( 'should go to next available page when interval is "once"', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, pageScroller, tracker );
			const onNext = vi.fn();
			controller.onNext( onNext );

			formModel.interval.value = Intervals.ONCE.value;
			controller.submitStep( { pageIndex } );

			expect( tracker.hasTrackedEvent( UpgradeToYearlyFormPageShownEvent.EVENT_NAME ) ).toBe( true );
			expect( onNext ).toHaveBeenCalledOnce();
		} );

		it( 'should scroll to top when submitted', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, pageScroller, tracker );
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

		it( 'should go to next page when an interval was submitted', function () {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, pageScroller, tracker );
			const onNext = vi.fn();
			controller.onNext( onNext );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.ONCE.value } } );

			// TODO this is failing because of some inconsistencies of calling submit/next (or goToStep in other cases),
			// we should unify the calls of submit / next events on form pages
			expect( tracker.hasTrackedEvent( AddressTypeFormPageShownEvent.EVENT_NAME ) ).toBe( true );
			expect( onNext ).toHaveBeenCalledOnce();
		} );

		it( 'should set interval to yearly and go back to the first form on "next" when user clicked on "donate yearly but different amount" link', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, pageScroller, tracker );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );
			formModel.interval.value = Intervals.ONCE.value;

			// the "next" function means that the user has clicked on the "yes, upgrade to yearly" link here
			controller.next( { pageIndex } );

			expect( formModel.interval.value ).toBe( Intervals.YEARLY.value );
			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( MAIN_DONATION_INDEX );
		} );

		it( 'should set interval to once on previous', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, pageScroller, tracker );
			const onPrevious = vi.fn();
			controller.onPrevious( onPrevious );
			formModel.interval.value = Intervals.YEARLY.value;

			controller.previous( { pageIndex } );

			expect( formModel.interval.value ).toBe( Intervals.ONCE.value );
			expect( onPrevious ).toHaveBeenCalledOnce();
		} );
	} );

	describe( 'Address Type', () => {
		const pageIndex = ADDRESS_TYPES_INDEX;

		it( 'should submit when one of the address options was selected', function () {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, pageScroller, tracker );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should jump back to main donation form when "previous" is called', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, pageScroller, tracker );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );
			formModel.interval.value = Intervals.ONCE.value;

			controller.previous( { pageIndex } );

			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( MAIN_DONATION_INDEX );
		} );
	} );

} );
