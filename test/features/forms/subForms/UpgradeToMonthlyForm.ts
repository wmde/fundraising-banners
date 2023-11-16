import { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';

export const submitUpgradeToMonthlyForm = async ( wrapper: VueWrapper<any>, upgrade: 'yes' | 'no' ): Promise<void> => {
	await wrapper.find( `.wmde-banner-select-group-option-${upgrade} .wmde-banner-select-group-input` ).setValue();
	await wrapper.find( '.wmde-banner-form-upgrade' ).trigger( 'submit' );
};

export const expectUpgradeToMonthlyFormSubmits = async ( wrapper: VueWrapper<any>, upgrade: 'yes' | 'no' ): Promise<any> => {
	const submitForm = wrapper.find<HTMLFormElement>( '.wmde-banner-submit-form' );
	submitForm.element.submit = vi.fn();

	await submitUpgradeToMonthlyForm( wrapper, upgrade );

	expect( submitForm.element.submit ).toHaveBeenCalledOnce();
};

export const expectUpgradeToMonthlyFormGoesToPageOnSubmit = async ( wrapper: VueWrapper<any>, page: number, upgrade: 'yes' | 'no' ): Promise<any> => {
	await submitUpgradeToMonthlyForm( wrapper, upgrade );

	expect( wrapper.find( `.wmde-banner-form-page:nth-child(${page})` ).attributes( 'class' ) )
		.toContain( 'wmde-banner-form-page--current' );
};

export const expectUpgradeToMonthlyFormGoesToPageOnLinkClick = async ( wrapper: VueWrapper<any>, page: number ): Promise<any> => {
	await wrapper.find( '.wmde-banner-form-upgrade-custom' ).trigger( 'click' );

	expect( wrapper.find( `.wmde-banner-form-page:nth-child(${page})` ).attributes( 'class' ) )
		.toContain( 'wmde-banner-form-page--current' );
};
