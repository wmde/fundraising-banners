import { VueWrapper } from '@vue/test-utils';
import {
	expectMainDonationFormGoesToPageOnSubmit,
	expectMainDonationFormSubmits,
	submitMainDonationForm
} from '@test/features/forms/subForms/MainDonationForm';
import {
	expectUpgradeToYearlyFormSubmits
} from '@test/features/forms/subForms/UpgradeToYearlyButtonForm';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

enum Pages {
	MainDonation = 1,
	UpgradeToYearly = 2
}

export const donationFormFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectMainDonationFormSubmitsWhenSofortIsSelected: ( wrapper: VueWrapper<any> ) => expectMainDonationFormSubmits(
		wrapper,
		Intervals.ONCE,
		PaymentMethods.SOFORT,
		'15'
	),
	expectMainDonationFormSubmitsWhenYearlyIsSelected: ( wrapper: VueWrapper<any> ) => expectMainDonationFormSubmits(
		wrapper,
		Intervals.YEARLY,
		PaymentMethods.PAYPAL,
		'15'
	),
	expectMainDonationFormGoesToUpgrade: ( wrapper: VueWrapper<any> ) => expectMainDonationFormGoesToPageOnSubmit( wrapper,
		Pages.UpgradeToYearly,
		Intervals.ONCE,
		PaymentMethods.PAYPAL,
		'25'
	),
	expectUpgradeToYearlyFormSubmitsUpgrade: async ( wrapper: VueWrapper<any> ) => {
		await submitMainDonationForm( wrapper, Intervals.ONCE, '15', PaymentMethods.PAYPAL );
		await expectUpgradeToYearlyFormSubmits( wrapper, 'yes' );
	},
	expectUpgradeToYearlyFormSubmitsDontUpgrade: async ( wrapper: VueWrapper<any> ) => {
		await submitMainDonationForm( wrapper, Intervals.ONCE, '25', PaymentMethods.PAYPAL );
		await expectUpgradeToYearlyFormSubmits( wrapper, 'no' );
	}
};
