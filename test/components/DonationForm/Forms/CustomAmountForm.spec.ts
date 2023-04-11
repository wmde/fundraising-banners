import { describe, expect, test } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import CustomAmountForm from '@src/components/DonationForm/Forms/CustomAmountForm.vue';

describe( 'CustomAmountForm.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return shallowMount( CustomAmountForm, {
			props: {
				pageIndex: 4
			},
			global: {
				mocks: {
					$translate: ( key: string ) => key
				},
				provide: {
					currencyFormatter: ( amount: number ) => String( amount )
				}
			}
		} );
	};

	test.each( [
		[ 0, true ],
		[ 100_000, true ],
		[ 5000, false ]
	] )( 'should show error message on blur when validation fails', async ( amount: number, showError: boolean ) => {
		const wrapper = getWrapper();
		const input = await wrapper.find( '.wmde-banner-select-custom-amount-input' );

		await input.setValue( amount );
		await input.trigger( 'blur' );

		expect( wrapper.find( '.wmde-banner-select-group-error-message' ).exists() ).toBe( showError );
	} );

} );
