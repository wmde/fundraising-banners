import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import { StepAction } from '@src/components/DonationForm/StepNavigation';
import { resetFormModel } from '@test/resetFormModel';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import {
	createSubmittableUpgradeToYearlyAnonymous
} from '@src/components/DonationForm/StepControllers/SubmittableUpgradeToYearlyAnonymous';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

const formModel = useFormModel();

describe( 'SubmittableUpgradeToYearlyAnonymous', () => {
	let stepNavigation: StepAction;

	// The model values are in the global scope, and they need to be reset before each test
	beforeEach( () => {
		resetFormModel( formModel );
		stepNavigation = {
			goToStep: vi.fn(),
			submit: vi.fn()
		};
	} );

	it( 'submits when user selects option', async () => {
		const upgrade = createSubmittableUpgradeToYearlyAnonymous( formModel, 'link', 'previous' );

		await upgrade.submit( stepNavigation, {} );

		expect( stepNavigation.submit ).toHaveBeenCalledOnce();
	} );

	it( 'Sets the address type to anonymous on submit', async () => {
		const controller = createSubmittableUpgradeToYearlyAnonymous( formModel, 'link', 'previous' );

		expect( formModel.addressType.value ).toEqual( '' );

		formModel.paymentMethod.value = PaymentMethods.PAYPAL.value;
		await controller.submit( stepNavigation, {} );

		expect( formModel.addressType.value ).toEqual( AddressTypes.ANONYMOUS.value );
	} );

	it( 'Will not set the address type to anonymous on submit when payment method is direct debit', async () => {
		const controller = createSubmittableUpgradeToYearlyAnonymous( formModel, 'link', 'previous' );

		expect( formModel.addressType.value ).toEqual( '' );

		formModel.paymentMethod.value = PaymentMethods.DIRECT_DEBIT.value;
		await controller.submit( stepNavigation, {} );

		expect( formModel.addressType.value ).toEqual( '' );
	} );

	it( 'goes to link step when user clicks link', async () => {
		const upgrade = createSubmittableUpgradeToYearlyAnonymous( formModel, 'link', 'previous' );

		await upgrade.submit( stepNavigation, { changeOfAmount: 'true' } );

		expect( stepNavigation.goToStep ).toHaveBeenCalledOnce();
		expect( stepNavigation.goToStep ).toHaveBeenCalledWith( 'link' );
	} );

	it( 'sets form interval to once on previous', async () => {
		formModel.interval.value = Intervals.YEARLY.value;
		const upgrade = createSubmittableUpgradeToYearlyAnonymous( formModel, 'link', 'previous' );

		await upgrade.previous( stepNavigation );

		expect( formModel.interval.value ).toBe( Intervals.ONCE.value );
	} );

	it( 'goes to previous step on previous', async () => {
		formModel.interval.value = Intervals.YEARLY.value;
		const upgrade = createSubmittableUpgradeToYearlyAnonymous( formModel, 'link', 'previous' );

		await upgrade.previous( stepNavigation );

		expect( stepNavigation.goToStep ).toHaveBeenCalledOnce();
		expect( stepNavigation.goToStep ).toHaveBeenCalledWith( 'previous' );
	} );

	describe( 'tracking events', function () {
		it( 'converts recurring interval to "submit" event with the correct option selected', async () => {
			const upgrade = createSubmittableUpgradeToYearlyAnonymous( formModel, 'link', 'previous' );

			await upgrade.submit( stepNavigation, { upgradeToYearlyInterval: Intervals.YEARLY.value } );

			expect( stepNavigation.submit ).toHaveBeenCalledWith( new BannerSubmitEvent( 'UpgradeToYearlyForm', 'recurring' ) );
		} );

		it( 'converts non-recurring interval to "submit" event with the correct option selected', async () => {
			const upgrade = createSubmittableUpgradeToYearlyAnonymous( formModel, 'link', 'previous' );

			await upgrade.submit( stepNavigation, { upgradeToYearlyInterval: Intervals.ONCE.value } );

			expect( stepNavigation.submit ).toHaveBeenCalledWith( new BannerSubmitEvent( 'UpgradeToYearlyForm', 'non-recurring' ) );
		} );
	} );
} );
