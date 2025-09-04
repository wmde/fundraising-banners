import { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { FormItem } from '@src/utils/FormItemsBuilder/FormItem';

export const setMainDonationFormValues = async ( wrapper: VueWrapper<any>, interval: FormItem, amount: string, payment: FormItem ): Promise<void> => {
	await wrapper.find( `.${interval.className} .wmde-banner-select-group-input` ).setValue();
	await wrapper.find( `.amount-${amount} .wmde-banner-select-group-input` ).setValue();
	await wrapper.find( `.${payment.className} .wmde-banner-select-group-input` ).setValue();
};

export const submitMainDonationForm = async ( wrapper: VueWrapper<any>, interval: FormItem, amount: string, payment: FormItem ): Promise<void> => {
	await setMainDonationFormValues( wrapper, interval, amount, payment );
	await wrapper.find( '.wmde-banner-sub-form-donation' ).trigger( 'submit' );
};

export const expectMainDonationFormSubmits = async (
	wrapper: VueWrapper<any>,
	interval: FormItem,
	payment: FormItem,
	amount: string = '10'
): Promise<any> => {
	const submitForm = wrapper.find<HTMLFormElement>( '.wmde-banner-submit-form' );
	submitForm.element.submit = vi.fn();

	await submitMainDonationForm( wrapper, interval, amount, payment );

	expect( submitForm.element.submit ).toHaveBeenCalledOnce();
};

export const expectMainDonationFormGoesToPageOnSubmit = async (
	wrapper: VueWrapper<any>,
	page: number,
	interval: FormItem,
	payment: FormItem,
	amount: string = '10'
): Promise<any> => {
	await submitMainDonationForm( wrapper, interval, amount, payment );

	expect( wrapper.find( `.wmde-banner-form-page:nth-child(${page})` ).attributes( 'class' ) )
		.toContain( 'wmde-banner-form-page--current' );
};

export const expectMainDonationFormUsesDefaultDynamicAmounts = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );

	expect( wrapper.find( '.amount-5' ).exists() ).toBeTruthy();
	expect( wrapper.find( '.amount-15' ).exists() ).toBeTruthy();
	expect( wrapper.find( '.amount-25' ).exists() ).toBeTruthy();
	expect( wrapper.find( '.amount-50' ).exists() ).toBeTruthy();
	expect( wrapper.find( '.amount-100' ).exists() ).toBeTruthy();
};

export const expectMainDonationFormUsesAlternativeDynamicAmounts = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button-preselect' ).trigger( 'click' );

	expect( wrapper.find( '.amount-10' ).exists() ).toBeTruthy();
	expect( wrapper.find( '.amount-15' ).exists() ).toBeTruthy();
	expect( wrapper.find( '.amount-25' ).exists() ).toBeTruthy();
	expect( wrapper.find( '.amount-50' ).exists() ).toBeTruthy();
	expect( wrapper.find( '.amount-100' ).exists() ).toBeTruthy();
};
