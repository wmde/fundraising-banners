import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import SelectCustomAmount from '@src/components/DonationForm/SubComponents/SelectCustomAmount.vue';

describe( 'SelectCustomAmount.vue', () => {
	it( 'updates the CSS classes when a value is entered', async () => {
		const wrapper = shallowMount( SelectCustomAmount, {
			props: {
				placeholder: 'placeholder-text',
				fieldName: 'fld-custom-amount'
			}
		} );

		await wrapper.find<HTMLInputElement>( 'input[type=text]' ).setValue( '2500' );

		expect( wrapper.attributes( 'class' ) ).toContain( 'value-entered' );
	} );

	it( 'updates the CSS classes when a value is entered', async () => {
		const wrapper = shallowMount( SelectCustomAmount, {
			props: {
				placeholder: 'placeholder-text',
				fieldName: 'fld-custom-amount'
			}
		} );

		await wrapper.find<HTMLInputElement>( 'input[type=text]' ).trigger( 'focus' );

		expect( wrapper.attributes( 'class' ) ).toContain( 'focused' );
	} );

	it( 'clears the custom amount when the selectedAmount becomes not null', async () => {
		const wrapper = shallowMount( SelectCustomAmount, {
			props: {
				placeholder: 'placeholder-text',
				fieldName: 'fld-custom-amount'
			}
		} );
		const textField = wrapper.find<HTMLInputElement>( 'input[type=text]' );
		await textField.setValue( '2500' );
		await wrapper.setProps( { selectedAmount: '42' } );

		expect( textField.element.value ).toBe( '' );
	} );
} );
