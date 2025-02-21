import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import CallToAction from '@src/components/UseOfFunds/CallToAction.vue';

describe( 'CallToAction.vue', () => {
	it( 'emits event when call to action is clicked', async () => {
		const wrapper = mount( CallToAction, {
			props: {
				text: 'whatever'
			}
		} );

		await wrapper.find( 'button' ).trigger( 'click' );

		expect( wrapper.emitted( 'hide' ).length ).toBe( 1 );
	} );
} );
