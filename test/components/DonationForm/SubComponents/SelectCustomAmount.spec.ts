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
} );
