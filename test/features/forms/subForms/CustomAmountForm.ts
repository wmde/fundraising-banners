import { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';

export const submitCustomAmountForm = async ( wrapper: VueWrapper<any>, amount: string ): Promise<void> => {
	await wrapper.find( '.wmde-banner-form-new-custom-amount .wmde-banner-select-custom-amount-input' ).setValue( amount );
	await wrapper.find( '.wmde-banner-form-new-custom-amount' ).trigger( 'submit' );
};

export const expectCustomAmountFormSubmits = async ( wrapper: VueWrapper<any>, amount: string ): Promise<any> => {
	const submitForm = wrapper.find<HTMLFormElement>( '.wmde-banner-submit-form' );
	submitForm.element.submit = vi.fn();

	await submitCustomAmountForm( wrapper, amount );

	expect( submitForm.element.submit ).toHaveBeenCalledOnce();
};

export const expectCustomAmountFormGoesToPageOnSubmit = async ( wrapper: VueWrapper<any>, page: number, amount: string ): Promise<any> => {
	await submitCustomAmountForm( wrapper, amount );

	expect( wrapper.find( `.wmde-banner-form-page:nth-child(${page})` ).attributes( 'class' ) )
		.toContain( 'wmde-banner-form-page--current' );
};
