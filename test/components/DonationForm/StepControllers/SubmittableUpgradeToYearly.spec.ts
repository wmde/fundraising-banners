import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import { StepNavigation } from '@src/components/DonationForm/StepNavigation';
import { resetFormModel } from '@test/resetFormModel';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import {
	createSubmittableUpgradeToYearly
} from '@src/components/DonationForm/StepControllers/SubmittableUpgradeToYearly';

const formModel = useFormModel();

describe( 'SubmittableUpgradeToYearly', () => {
	let stepNavigation: StepNavigation;

	// The model values are in the global scope, and they need to be reset before each test
	beforeEach( () => {
		resetFormModel( formModel );
		stepNavigation = {
			goToStep: vi.fn(),
			submit: vi.fn()
		};
	} );

	it( 'submits when user selects option', async () => {
		const upgrade = createSubmittableUpgradeToYearly( formModel, 'link', 'previous' );

		await upgrade.submit( stepNavigation, {} );

		expect( stepNavigation.submit ).toHaveBeenCalledOnce();
	} );

	it( 'goes to link step when user clicks link', async () => {
		const upgrade = createSubmittableUpgradeToYearly( formModel, 'link', 'previous' );

		await upgrade.submit( stepNavigation, { changeOfAmount: 'true' } );

		expect( stepNavigation.goToStep ).toHaveBeenCalledOnce();
		expect( stepNavigation.goToStep ).toHaveBeenCalledWith( 'link' );
	} );

	it( 'sets form interval to once on previous', async () => {
		formModel.interval.value = Intervals.YEARLY.value;
		const upgrade = createSubmittableUpgradeToYearly( formModel, 'link', 'previous' );

		await upgrade.previous( stepNavigation, {} );

		expect( formModel.interval.value ).toBe( Intervals.ONCE.value );
	} );

	it( 'goes to previous step on previous', async () => {
		formModel.interval.value = Intervals.YEARLY.value;
		const upgrade = createSubmittableUpgradeToYearly( formModel, 'link', 'previous' );

		await upgrade.previous( stepNavigation, {} );

		expect( stepNavigation.goToStep ).toHaveBeenCalledOnce();
		expect( stepNavigation.goToStep ).toHaveBeenCalledWith( 'previous' );
	} );
} );
