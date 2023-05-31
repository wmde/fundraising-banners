import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import SelectionInput from '@src/components/Footer/SelectionInput.vue';

describe( 'SelectionInput.vue', () => {

	beforeEach( () => {
		vi.useFakeTimers();
	} );

	afterEach( () => {
		vi.restoreAllMocks();
	} );

	it( 'sets prop value as both values', () => {
		const wrapper = shallowMount( SelectionInput, {
			props: {
				value: 'value'
			}
		} );

		expect( wrapper.find<HTMLInputElement>( '.wmde-banner-selection-input-input' ).element.value ).toBe( 'value' );
		expect( wrapper.find( '.wmde-banner-selection-input-text' ).text() ).toBe( 'value' );
	} );

	it( 'sets focusedValue as input text when one is provided as a prop', () => {
		const wrapper = shallowMount( SelectionInput, {
			props: {
				value: 'value',
				focusedValue: 'focusedValue'
			}
		} );

		expect( wrapper.find<HTMLInputElement>( '.wmde-banner-selection-input-input' ).element.value ).toBe( 'focusedValue' );
		expect( wrapper.find( '.wmde-banner-selection-input-text' ).text() ).toBe( 'value' );
	} );

	it( 'selects text on focus', () => {
		const wrapper = shallowMount( SelectionInput, {
			props: {
				value: 'value'
			}
		} );

		const input = wrapper.find<HTMLInputElement>( '.wmde-banner-selection-input-input' );
		input.trigger( 'focus' );
		vi.runAllTimers();
		const selected = input.element.value.slice( input.element.selectionStart, input.element.selectionEnd );

		expect( selected ).toBe( 'value' );
	} );

	it( 'sets and removes focus class', async () => {
		const wrapper = shallowMount( SelectionInput, {
			props: {
				value: 'value',
				focusedValue: 'focusedValue'
			}
		} );

		const input = wrapper.find<HTMLInputElement>( '.wmde-banner-selection-input-input' );

		await input.trigger( 'focus' );

		expect( wrapper.classes() ).toContain( 'focused' );

		await input.trigger( 'blur' );

		expect( wrapper.classes() ).not.toContain( 'focused' );
	} );
} );
