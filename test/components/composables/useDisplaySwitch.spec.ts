import { describe, expect, it } from 'vitest';
import { useDisplaySwitch } from '@src/components/composables/useDisplaySwitch';
import { defineComponent } from 'vue';
import { shallowMount } from '@vue/test-utils';

describe( 'useDisplaySwitch', () => {
	const TestComponent = defineComponent( {
		props: {
			minWidth: Number
		},
		setup( props ) {
			return {
				onLargeScreen: useDisplaySwitch( props.minWidth )
			};
		},
		render() {
			return '';
		}
	} );

	it( 'starts with the component adapted to large screen size', () => {
		Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 100 } );

		const wrapper = shallowMount( TestComponent, { props: { minWidth: 99 } } );

		expect( wrapper.vm.onLargeScreen ).toBe( true );

	} );

	it( 'starts with the component adapted to small screen size', () => {
		Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 100 } );

		const wrapper = shallowMount( TestComponent, { props: { minWidth: 100 } } );

		expect( wrapper.vm.onLargeScreen ).toBe( false );

	} );
} );
