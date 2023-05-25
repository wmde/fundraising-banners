import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createSubmittableAddressType } from '@src/components/DonationForm/StepControllers/SubmittableAddressType';
import { useFormModel } from '@src/components/composables/useFormModel';
import { StepAction } from '@src/components/DonationForm/StepNavigation';
import { resetFormModel } from '@test/resetFormModel';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { Validity } from '@src/utils/FormModel/Validity';

const formModel = useFormModel();

describe( 'SubmittableAddressType', () => {
	let stepNavigation: StepAction;

	// The model values are in the global scope, and they need to be reset before each test
	beforeEach( () => {
		resetFormModel( formModel );
		stepNavigation = {
			goToStep: vi.fn(),
			submit: vi.fn()
		};
	} );

	it( 'submits on submit', async () => {
		const addressType = createSubmittableAddressType( formModel, 'previous' );

		await addressType.submit( stepNavigation, {} );

		expect( stepNavigation.submit ).toHaveBeenCalledOnce();
	} );

	it( 'resets form model data on previous', async () => {
		formModel.addressType.value = AddressTypes.EMAIL.value;
		formModel.addressTypeValidity.value = Validity.Valid;
		const addressType = createSubmittableAddressType( formModel, 'previous' );

		await addressType.previous( stepNavigation );

		expect( formModel.addressType.value ).toBe( '' );
		expect( formModel.addressTypeValidity.value ).toBe( Validity.Unset );
	} );

	it( 'goes to previous on previous', async () => {
		const addressType = createSubmittableAddressType( formModel, 'previous' );

		await addressType.previous( stepNavigation );

		expect( stepNavigation.goToStep ).toHaveBeenCalledOnce();
		expect( stepNavigation.goToStep ).toHaveBeenCalledWith( 'previous' );
	} );
} );
