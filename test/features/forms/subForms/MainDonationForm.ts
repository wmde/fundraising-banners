import { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { FormItem } from '@src/utils/FormItemsBuilder/FormItem';

export const submitMainDonationForm = async ( wrapper: VueWrapper<any>, interval: FormItem, amount: string, payment: FormItem ): Promise<void> => {
	await wrapper.find( `.${interval.className} .wmde-banner-select-group-input` ).setValue();
	await wrapper.find( `.amount-${amount} .wmde-banner-select-group-input` ).setValue();
	await wrapper.find( `.${payment.className} .wmde-banner-select-group-input` ).setValue();
	await wrapper.find( '.wmde-banner-sub-form-donation' ).trigger( 'submit' );
};

export const expectMainDonationFormSubmits = async ( wrapper: VueWrapper<any>, interval: FormItem, payment: FormItem ): Promise<any> => {
	const submitForm = wrapper.find<HTMLFormElement>( '.wmde-banner-submit-form' );
	submitForm.element.submit = vi.fn();

	await submitMainDonationForm( wrapper, interval, '5', payment );

	expect( submitForm.element.submit ).toHaveBeenCalledOnce();
};

export const expectMainDonationFormGoesToPageOnSubmit = async ( wrapper: VueWrapper<any>, page: number, interval: FormItem, payment: FormItem ): Promise<any> => {
	await submitMainDonationForm( wrapper, interval, '5', payment );

	expect( wrapper.find( `.wmde-banner-form-page:nth-child(${page})` ).attributes( 'class' ) )
		.toContain( 'wmde-banner-form-page--current' );
};
