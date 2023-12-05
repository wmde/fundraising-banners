import { describe, expect, it, vi } from 'vitest';
import {
	createSubmittableMainDonationFormSinglePageAnonymous
} from '@src/components/DonationForm/StepControllers/SubmittableMainDonationFormSinglePageAnonymous';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { useFormModel } from '@src/components/composables/useFormModel';
import { beforeEach } from 'vitest';
import { resetFormModel } from '@test/resetFormModel';

const formModel = useFormModel();

describe( 'SubmittableMainDonationFormSinglePageAnonymous', () => {

	beforeEach( () => {
		resetFormModel( formModel );
	} );

	it( 'Submits', async () => {
		const stepNavigation = { goToStep: vi.fn(), submit: vi.fn() };
		const controller = createSubmittableMainDonationFormSinglePageAnonymous( formModel );

		await controller.submit( stepNavigation, {} );

		expect( stepNavigation.submit ).toHaveBeenCalledOnce();
		expect( stepNavigation.submit ).toHaveBeenCalledWith( new BannerSubmitEvent( 'MainDonationForm' ) );
	} );

	it.skip( 'Leads directly to the page of the external service provider on submit', () => {

	} );

	it( 'Rejects go to page', async () => {
		const stepNavigation = { goToStep: vi.fn(), submit: vi.fn() };
		const controller = createSubmittableMainDonationFormSinglePageAnonymous( formModel );

		expect( controller.previous( stepNavigation ) ).rejects.toEqual( 'Single page forms cannot go to previous. This should never happen.' );
	} );
} );
