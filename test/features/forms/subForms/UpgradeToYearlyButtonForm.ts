import { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';

export const submitUpgradeToYearlyButtonForm = async ( wrapper: VueWrapper<any>, upgrade: 'yes' | 'no' ): Promise<void> => {
	const buttonValue = upgrade === 'yes' ? Intervals.YEARLY.value : Intervals.ONCE.value;
	await wrapper.find( `.wmde-banner-form-upgrade button[value="${buttonValue}"]` ).trigger( 'click' );
};

export const expectUpgradeToYearlyFormSubmits = async ( wrapper: VueWrapper<any>, upgrade: 'yes' | 'no' ): Promise<any> => {
	const submitForm = wrapper.find<HTMLFormElement>( '.wmde-banner-submit-form' );
	submitForm.element.submit = vi.fn();

	await submitUpgradeToYearlyButtonForm( wrapper, upgrade );

	expect( submitForm.element.submit ).toHaveBeenCalledOnce();
};

export const expectUpgradeToYearlyFormGoesToPageOnSubmit = async ( wrapper: VueWrapper<any>, page: number, upgrade: 'yes' | 'no' ): Promise<any> => {
	await submitUpgradeToYearlyButtonForm( wrapper, upgrade );

	expect( wrapper.find( `.wmde-banner-form-page:nth-child(${page})` ).attributes( 'class' ) )
		.toContain( 'wmde-banner-form-page--current' );
};

export const expectUpgradeToYearlyFormGoesToPageOnLinkClick = async ( wrapper: VueWrapper<any>, page: number ): Promise<any> => {
	await wrapper.find( '.wmde-banner-form-upgrade-custom' ).trigger( 'click' );

	expect( wrapper.find( `.wmde-banner-form-page:nth-child(${page})` ).attributes( 'class' ) )
		.toContain( 'wmde-banner-form-page--current' );
};
