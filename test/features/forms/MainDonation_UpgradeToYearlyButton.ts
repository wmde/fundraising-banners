import type { VueWrapper } from '@vue/test-utils';
import {
	expectMainDonationFormGoesToPageOnSubmit,
	expectMainDonationFormSubmits,
	expectMainDonationFormUsesAlternativeDynamicAmounts,
	setMainDonationFormValues,
	expectMainDonationFormUsesDefaultDynamicAmounts,
	submitMainDonationForm
} from '@test/features/forms/subForms/MainDonationForm';
import {
	expectUpgradeToYearlyFormSubmits
} from '@test/features/forms/subForms/UpgradeToYearlyButtonForm';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { expect } from 'vitest';

enum Pages {
	MainDonation = 1,
	UpgradeToYearly = 2
}

const submitOpensInNewTab = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await setMainDonationFormValues( wrapper, Intervals.YEARLY, '15', PaymentMethods.PAYPAL );

	expect( wrapper.find( '.wmde-banner-submit-form' ).attributes( 'target' ) ).toStrictEqual( '_blank' );
};

const submitHidesBanner = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await setMainDonationFormValues( wrapper, Intervals.YEARLY, '15', PaymentMethods.PAYPAL );
	await wrapper.find( '.wmde-banner-sub-form-donation' ).trigger( 'submit' );

	expect( wrapper.emitted( 'bannerSubmitted' ).length ).toStrictEqual( 1 );
};

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
	},
	expectMainDonationFormUsesDefaultDynamicAmounts: ( wrapper: VueWrapper<any> ) => expectMainDonationFormUsesDefaultDynamicAmounts( wrapper ),
	expectMainDonationFormUsesAlternativeDynamicAmounts: ( wrapper: VueWrapper<any> ) => expectMainDonationFormUsesAlternativeDynamicAmounts( wrapper ),
	submitOpensInNewTab,
	submitHidesBanner
};
