import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import HighlightedText from '@src/components/AnimatedText2026/AnimatedText.vue';

describe( 'AnimatedText.vue', () => {

	it( 'shows when it has text', () => {
		const wrapper = shallowMount( HighlightedText, {
			slots: {
				default: 'I have text'
			}
		} );

		expect( wrapper.html() ).toStrictEqual( '<span class="wmde-b-animated-text">I have text</span>' );
	} );

	it( 'does not show if text is empty', () => {
		const wrapper = shallowMount( HighlightedText, {
			slots: {}
		} );

		expect( wrapper.html() ).toStrictEqual( '<!--v-if-->' );
	} );

	it( 'plays when it bedomes visible', async () => {
		const wrapper = shallowMount( HighlightedText, {
			slots: {
				default: 'I have text'
			}
		} );

		await wrapper.setProps( { isVisible: true } );

		expect( wrapper.classes() ).toContain( 'wmde-b-animated-text--visible' );
	} );

} );
