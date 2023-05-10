import { describe, vi, it, expect, beforeEach } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import {
	ADDRESS_TYPES_INDEX,
	FormControllerVar,
	MAIN_DONATION_INDEX, NEW_CUSTOM_AMOUNT_INDEX,
	UPGRADE_TO_YEARLY_INDEX
} from '../../../banners/desktop/FormControllerVar';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { resetFormModel } from '@test/resetFormModel';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { Validity } from '@src/utils/FormModel/Validity';
import { TrackerSpy } from '@test/fixtures/TrackerSpy';
import { UpgradeToYearlyFormPageShownEvent } from '@src/tracking/events/UpgradeToYearlyFormPageShownEvent';
import { CustomAmountFormPageShownEvent } from '@src/tracking/events/CustomAmountFormPageShownEvent';
import { IncreaseCustomAmountEvent } from '@src/tracking/events/IncreaseCustomAmountEvent';
import { DecreaseCustomAmountEvent } from '@src/tracking/events/DecreaseCustomAmountEvent';

describe( 'FormControllerVar', () => {
	const formModel = useFormModel();

	beforeEach( () => resetFormModel( formModel ) );

	describe( 'Donation form', () => {
		const pageIndex = MAIN_DONATION_INDEX;

		it( 'should go to address page when recurring interval is selected', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, tracker );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );

			formModel.interval.value = Intervals.BIANNUAL.value;
			controller.submitStep( { pageIndex } );

			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( ADDRESS_TYPES_INDEX );
		} );

		it( 'should go to address page when the payment type is sofort', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, tracker );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );

			formModel.interval.value = Intervals.ONCE.value;
			formModel.paymentMethod.value = PaymentMethods.SOFORT.value;
			controller.submitStep( { pageIndex } );

			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( ADDRESS_TYPES_INDEX );
		} );

		it( 'should go to next page when interval is "once"', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, tracker );
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

		it( 'should go to address page when an interval was selected', function () {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, tracker );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.YEARLY.value } } );

			expect( onGoToStep ).toHaveBeenCalledOnce();
		} );

		it( 'should go to custom amount page on next', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, tracker );
			const onNext = vi.fn();
			controller.onNext( onNext );
			formModel.interval.value = Intervals.ONCE.value;

			controller.next( { pageIndex } );

			// the submit handler of the custom amount page will set the interval
			expect( formModel.interval.value ).toBe( Intervals.ONCE.value );
			expect( tracker.hasTrackedEvent( CustomAmountFormPageShownEvent.EVENT_NAME ) ).toBe( true );
			expect( onNext ).toHaveBeenCalledOnce();
		} );

		it( 'should set interval to once on previous', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, tracker );
			const onPrevious = vi.fn();
			controller.onPrevious( onPrevious );
			formModel.interval.value = Intervals.YEARLY.value;

			controller.previous( { pageIndex } );

			expect( formModel.interval.value ).toBe( Intervals.ONCE.value );
			expect( onPrevious ).toHaveBeenCalledOnce();
		} );
	} );

	describe( 'New custom amount', () => {
		const pageIndex = NEW_CUSTOM_AMOUNT_INDEX;

		it( 'should go to next page when submitting', function () {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, tracker );
			const onNext = vi.fn();
			controller.onNext( onNext );

			controller.submitStep( { pageIndex, extraData: { newCustomAmount: '42.23' } } );

			expect( onNext ).toHaveBeenCalledOnce();
		} );

		it( 'should track amount increase', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, tracker );
			const onNext = vi.fn();
			controller.onNext( onNext );
			formModel.customAmount.value = '5';

			controller.submitStep( { pageIndex, extraData: { newCustomAmount: '42.23' } } );

			expect( tracker.hasTrackedEvent( IncreaseCustomAmountEvent.EVENT_NAME ) ).toBe( true );
		} );

		it( 'should track amount decrease', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, tracker );
			const onNext = vi.fn();
			controller.onNext( onNext );
			formModel.customAmount.value = '789';

			controller.submitStep( { pageIndex, extraData: { newCustomAmount: '42.23' } } );

			expect( tracker.hasTrackedEvent( DecreaseCustomAmountEvent.EVENT_NAME ) ).toBe( true );
		} );
	} );

	describe( 'Address form', () => {
		const pageIndex = ADDRESS_TYPES_INDEX;

		it( 'should submit', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, tracker );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should go to donation form when "previous" is called', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, tracker );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );

			controller.previous( { pageIndex } );

			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( MAIN_DONATION_INDEX );
		} );

		it( 'should unset address type in the model when "previous" is called', () => {
			const tracker = new TrackerSpy();
			const controller = new FormControllerVar( formModel, tracker );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );
			formModel.addressType.value = AddressTypes.EMAIL.value;

			controller.previous( { pageIndex } );

			expect( formModel.addressType.value ).toBe( '' );
			expect( formModel.addressTypeValidity.value ).toBe( Validity.Unset );
		} );

	} );

} );
