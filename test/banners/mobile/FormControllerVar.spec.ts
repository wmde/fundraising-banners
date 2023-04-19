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

describe( 'FormControllerVar', () => {
	const formModel = useFormModel();

	beforeEach( () => resetFormModel( formModel ) );

	describe( 'Donation form', () => {
		const pageIndex = MAIN_DONATION_INDEX;

		it( 'should go straight to address form page when recurring interval is selected', () => {
			const controller = new FormControllerVar( formModel );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );

			formModel.interval.value = Intervals.BIANNUAL.value;
			controller.submitStep( { pageIndex } );

			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( ADDRESS_TYPES_INDEX );
		} );

		it( 'should go straight to address form page when the payment type is sofort', () => {
			const controller = new FormControllerVar( formModel );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );

			formModel.interval.value = Intervals.ONCE.value;
			formModel.paymentMethod.value = PaymentMethods.SOFORT.value;
			controller.submitStep( { pageIndex } );

			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( ADDRESS_TYPES_INDEX );
		} );

		it( 'should go to next available page when interval is "once"', () => {
			const controller = new FormControllerVar( formModel );
			const onNext = vi.fn();
			controller.onNext( onNext );

			formModel.interval.value = Intervals.ONCE.value;
			controller.submitStep( { pageIndex } );

			expect( onNext ).toHaveBeenCalledOnce();
		} );

	} );

	describe( 'Upgrade to yearly', () => {
		const pageIndex = UPGRADE_TO_YEARLY_INDEX;

		it( 'should go to next page when an interval was submitted', function () {
			const controller = new FormControllerVar( formModel );
			const onNext = vi.fn();
			controller.onNext( onNext );

			controller.submitStep( { pageIndex, extraData: { upgradeToYearlyInterval: Intervals.ONCE.value } } );

			expect( onNext ).toHaveBeenCalledOnce();
		} );

		it( 'should set interval to yearly and go to previous form on "next"', () => {
			const controller = new FormControllerVar( formModel );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );
			formModel.interval.value = Intervals.ONCE.value;

			controller.next( { pageIndex } );

			expect( formModel.interval.value ).toBe( Intervals.YEARLY.value );
			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( MAIN_DONATION_INDEX );
		} );

		it( 'should set interval to once on previous', () => {
			const controller = new FormControllerVar( formModel );
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
			const controller = new FormControllerVar( formModel );
			const onSubmit = vi.fn();
			controller.onSubmit( onSubmit );

			controller.submitStep( { pageIndex } );

			expect( onSubmit ).toHaveBeenCalledOnce();
		} );

		it( 'should jump back to main donation form when "previous" is called', () => {
			const controller = new FormControllerVar( formModel );
			const onGoToStep = vi.fn();
			controller.onGoToStep( onGoToStep );
			formModel.interval.value = Intervals.ONCE.value;

			controller.previous( { pageIndex } );

			expect( onGoToStep ).toHaveBeenCalledOnce();
			expect( onGoToStep ).toHaveBeenCalledWith( MAIN_DONATION_INDEX );
		} );
	} );

} );
