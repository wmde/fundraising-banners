import { VueWrapper } from '@vue/test-utils';
import { donationFormFeatures as mainDonationFormFeatures } from '@test/features/forms/MainDonation_UpgradeToYearlyButton';
import { expect } from 'vitest';

export const donationFormFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	...mainDonationFormFeatures,

	expectMainDonationFormShowsDonationReceiptCheckbox: async ( wrapper: VueWrapper<any> ) => {
		expect( wrapper.find( '.wmde-banner-form-donation-receipt-checkbox' ).exists() ).toBeFalsy();

		await wrapper.find( '.interval-0 .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.amount-5 .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.payment-ppl .wmde-banner-select-group-input' ).trigger( 'change' );

		expect( wrapper.find( '.wmde-banner-form-donation-receipt-checkbox' ).exists() ).toBeTruthy();
	}
};
