import { beforeEach, describe, expect, it, test, vi } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import { StepAction } from '@src/components/DonationForm/StepNavigation';
import { resetFormModel } from '@test/resetFormModel';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import {
	createSubmittableMainDonationFormAnonymous
} from '@src/components/DonationForm/StepControllers/SubmittableMainDonationFormAnonymous';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';

const formModel = useFormModel();

describe( 'SubmittableMainDonationForm', () => {
	let stepNavigation: StepAction;

	// The model values are in the global scope, and they need to be reset before each test
	beforeEach( () => {
		resetFormModel( formModel );
		stepNavigation = {
			goToStep: vi.fn(),
			submit: vi.fn()
		};
	} );

	test.each( [
		[ PaymentMethods.PAYPAL.value ],
		[ PaymentMethods.BANK_TRANSFER.value ],
		[ PaymentMethods.CREDIT_CARD.value ],
		[ PaymentMethods.DIRECT_DEBIT.value ]
	] )( 'submits when payment method is Sofort', async ( paymentMethod: string ) => {
		formModel.paymentMethod.value = paymentMethod;
		formModel.interval.value = Intervals.ONCE.value;
		const donationForm = createSubmittableMainDonationFormAnonymous( formModel, 'yearly' );

		await donationForm.submit( stepNavigation, {} );

		expect( stepNavigation.goToStep ).toHaveBeenCalledOnce();
		expect( stepNavigation.goToStep ).toHaveBeenCalledWith( 'yearly' );
	} );

	it( 'goes to upgrade when payment method is not Sofort', async () => {
		formModel.paymentMethod.value = PaymentMethods.SOFORT.value;
		formModel.interval.value = Intervals.ONCE.value;
		const donationForm = createSubmittableMainDonationFormAnonymous( formModel, 'yearly' );

		await donationForm.submit( stepNavigation, {} );

		expect( stepNavigation.submit ).toHaveBeenCalledOnce();
	} );

	test.each( [
		[ Intervals.MONTHLY.value ],
		[ Intervals.QUARTERLY.value ],
		[ Intervals.BIANNUAL.value ],
		[ Intervals.YEARLY.value ]
	] )( 'submits when interval is not once', async ( interval: string ) => {
		formModel.interval.value = interval;
		formModel.paymentMethod.value = PaymentMethods.PAYPAL.value;
		const donationForm = createSubmittableMainDonationFormAnonymous( formModel, 'yearly' );

		await donationForm.submit( stepNavigation, {} );

		expect( stepNavigation.submit ).toHaveBeenCalledOnce();
	} );

	it( 'goes to upgrade when interval is once', async () => {
		formModel.interval.value = Intervals.ONCE.value;
		formModel.paymentMethod.value = PaymentMethods.PAYPAL.value;
		const donationForm = createSubmittableMainDonationFormAnonymous( formModel, 'yearly' );

		await donationForm.submit( stepNavigation, {} );

		expect( stepNavigation.goToStep ).toHaveBeenCalledOnce();
		expect( stepNavigation.goToStep ).toHaveBeenCalledWith( 'yearly' );
	} );

	it( 'rejects calls to previous', async () => {
		const donationForm = createSubmittableMainDonationFormAnonymous( formModel, 'yearly' );

		expect( donationForm.previous( stepNavigation ) ).rejects.toEqual( 'we can\'t go to previous! This should never happen' );
	} );

	it( 'Sets the address type to anonymous on submit', async () => {
		const controller = createSubmittableMainDonationFormAnonymous( formModel, 'yearly' );

		expect( formModel.addressType.value ).toEqual( '' );

		formModel.paymentMethod.value = PaymentMethods.CREDIT_CARD.value;
		await controller.submit( stepNavigation, {} );

		expect( formModel.addressType.value ).toEqual( AddressTypes.ANONYMOUS.value );
	} );

	it( 'Will not set the address type to anonymous on submit when payment method is direct debit', async () => {
		const controller = createSubmittableMainDonationFormAnonymous( formModel, 'yearly' );

		expect( formModel.addressType.value ).toEqual( '' );

		formModel.paymentMethod.value = PaymentMethods.DIRECT_DEBIT.value;
		await controller.submit( stepNavigation, {} );

		expect( formModel.addressType.value ).toEqual( '' );
	} );
} );
