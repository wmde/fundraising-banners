import { describe, expect, it, vi } from 'vitest';
import {
	createSubmittableMainDonationFormSinglePage
} from '@src/components/DonationForm/StepControllers/SubmittableMainDonationFormSinglePage';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';

describe( 'SubmittableMainDonationFormSinglePage', () => {
	it( 'Submits', async () => {
		const stepNavigation = { goToStep: vi.fn(), submit: vi.fn() };
		const controller = createSubmittableMainDonationFormSinglePage();

		await controller.submit( stepNavigation, {} );

		expect( stepNavigation.submit ).toHaveBeenCalledOnce();
		expect( stepNavigation.submit ).toHaveBeenCalledWith( new BannerSubmitEvent( 'MainDonationForm' ) );
	} );

	it( 'Rejects go to page', async () => {
		const stepNavigation = { goToStep: vi.fn(), submit: vi.fn() };
		const controller = createSubmittableMainDonationFormSinglePage();

		expect( controller.previous( stepNavigation ) ).rejects.toEqual( 'Single page forms cannot go to previous. This should never happen.' );
	} );
} );
