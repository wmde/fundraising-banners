import { describe, expect, it } from 'vitest';
import { useDisplaySwitch } from '@src/components/composables/useDisplaySwitch';
import { defineComponent } from 'vue';
import { shallowMount } from '@vue/test-utils';

describe( 'useDisplaySwitch', () => {
	it( 'starts with a components adapted to screen size', () => {
		Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 100 } );

		const TestComponent = defineComponent( {
			setup() {
				return {
					onLargeScreen: useDisplaySwitch( 99 )
				};
			},
			render() {
				return '';
			}
		} );

		const wrapper = shallowMount( TestComponent );

		expect( wrapper.vm.onLargeScreen ).toBe( true );

	} );
} );
