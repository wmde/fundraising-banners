import { describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import CloseButton from '@banners/thank_you_2024/components/CloseButton.vue';

describe( 'CloseButton.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return mount( CloseButton, {
			props: {
				label: 'CLOSE'
			}
		} );
	};

	it( 'Emits events', async () => {
		const wrapper = getWrapper();

		await wrapper.trigger( 'click' );

		expect( wrapper.emitted( 'click' ).length ).toStrictEqual( 1 );
	} );
} );
