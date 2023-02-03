import { mount } from '@vue/test-utils';
import CloseIconDefault from '@src/components/Icons/CloseIconDefault.vue';
import { describe, it, expect } from 'vitest';

describe( 'CloseIconDefault.vue', () => {

	it( 'should render the fill property', () => {
		const wrapper = mount( CloseIconDefault, {
			props: { fill: '#FADE00' }
		} );

		expect( wrapper.find( 'path' ).attributes( 'fill' ) ).toBe( '#FADE00' );
	} );

	it( 'should have a default fill property', () => {
		const wrapper = mount( CloseIconDefault );

		expect( wrapper.find( 'path' ).attributes( 'fill' ) ).toBe( '#A9A9A9' );
	} );

} );
