import { describe, vi, it, expect, beforeEach } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import {
	FormControllerCtrl,
	MAIN_DONATION_INDEX, NEW_CUSTOM_AMOUNT_INDEX,
	UPGRADE_TO_YEARLY_INDEX
} from '../../../banners/desktop/FormControllerCtrl';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { resetFormModel } from '@test/resetFormModel';
import { TrackerSpy } from '@test/fixtures/TrackerSpy';
import { UpgradeToYearlyFormPageShownEvent } from '@src/tracking/events/UpgradeToYearlyFormPageShownEvent';
import { CustomAmountFormPageShownEvent } from '@src/tracking/events/CustomAmountFormPageShownEvent';
import { IncreaseCustomAmountEvent } from '@src/tracking/events/IncreaseCustomAmountEvent';
import { DecreaseCustomAmountEvent } from '@src/tracking/events/DecreaseCustomAmountEvent';

describe( 'FormControllerCtrl', () => {
	const formModel = useFormModel();

	beforeEach( () => resetFormModel( formModel ) );

	describe( 'Donation form', () => {
		const pageIndex = MAIN_DONATION_INDEX;

		it( 'should submit when recurring interval is selected', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerCtrl( formModel, tracker );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			formModel.interval.value = Intervals.BIANNUAL.value;
			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should submit when the payment type is sofort', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerCtrl( formModel, tracker );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			formModel.interval.value = Intervals.ONCE.value;
			formModel.paymentMethod.value = PaymentMethods.SOFORT.value;
			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should go to next page when interval is "once"', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerCtrl( formModel, tracker );
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

		it( 'should submit data for yearly interval', function () {
			const tracker = new TrackerSpy();
			const controller = new FormControllerCtrl( formModel, tracker );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.YEARLY.value } } );

			expect( onSubmit ).toHaveBeenCalledOnce();
			expect( onSubmit ).toHaveBeenCalledWith( 'submit-recurring' );
		} );

		it( 'should submit data for "once" interval', function () {
			const tracker = new TrackerSpy();
			const controller = new FormControllerCtrl( formModel, tracker );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.ONCE.value } } );

			expect( onSubmit ).toHaveBeenCalledOnce();
			expect( onSubmit ).toHaveBeenCalledWith( 'submit-non-recurring' );
		} );

		it( 'should set interval to once on previous', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerCtrl( formModel, tracker );
			const onPrevious = vi.fn();
			controller.onPrevious( onPrevious );
			formModel.interval.value = Intervals.YEARLY.value;

			controller.previous( { pageIndex } );

			expect( formModel.interval.value ).toBe( Intervals.ONCE.value );
			expect( onPrevious ).toHaveBeenCalledOnce();
		} );

		it( 'should go to custom amount page on next', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerCtrl( formModel, tracker );
			const onNext = vi.fn();
			controller.onNext( onNext );
			formModel.interval.value = Intervals.ONCE.value;

			controller.next( { pageIndex } );

			// the submit handler of the custom amount page will set the interval
			expect( formModel.interval.value ).toBe( Intervals.ONCE.value );
			expect( tracker.hasTrackedEvent( CustomAmountFormPageShownEvent.EVENT_NAME ) ).toBe( true );
			expect( onNext ).toHaveBeenCalledOnce();
		} );
	} );

	describe( 'New custom amount', () => {
		const pageIndex = NEW_CUSTOM_AMOUNT_INDEX;

		it( 'should set interval to yearly on submit', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerCtrl( formModel, tracker );
			controller.onSubmit( vi.fn() );
			formModel.interval.value = Intervals.ONCE.value;

			controller.submitStep( { pageIndex, extraData: { newCustomAmount: '14.31' } } );

			expect( formModel.interval.value ).toBe( Intervals.YEARLY.value );
		} );

		it( 'should overwrite numericAmount on submit', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerCtrl( formModel, tracker );
			controller.onSubmit( vi.fn() );
			formModel.customAmount.value = '9.05';

			controller.submitStep( { pageIndex, extraData: { newCustomAmount: '12.01' } } );

			expect( formModel.numericAmount.value ).toBe( 12.01 );
		} );

		it( 'should submit the new amount', function () {
			const tracker = new TrackerSpy();
			const controller = new FormControllerCtrl( formModel, tracker );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex, extraData: { newCustomAmount: '42.23' } } );

			expect( onSubmit ).toHaveBeenCalledOnce();
			expect( onSubmit ).toHaveBeenCalledWith( 'submit-different-amount' );
		} );

		it( 'should track amount increase', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerCtrl( formModel, tracker );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );
			formModel.customAmount.value = '5';

			controller.submitStep( { pageIndex, extraData: { newCustomAmount: '42.23' } } );

			expect( tracker.hasTrackedEvent( IncreaseCustomAmountEvent.EVENT_NAME ) ).toBe( true );
		} );

		it( 'should track amount decrease', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerCtrl( formModel, tracker );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );
			formModel.customAmount.value = '789';

			controller.submitStep( { pageIndex, extraData: { newCustomAmount: '42.23' } } );

			expect( tracker.hasTrackedEvent( DecreaseCustomAmountEvent.EVENT_NAME ) ).toBe( true );
		} );
	} );

} );
