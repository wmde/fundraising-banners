import { describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import ProgressBar from '@banners/thank_you/components/ProgressBar.vue';
import thankYouContent from '@test/fixtures/ThankYouContent';

describe( 'ProgressBar.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return mount( ProgressBar, {
			props: {
				thankYouContent
			},
		} );
	};

	it( 'Sets the fill', () => {
		const wrapper = getWrapper();

		expect( wrapper.attributes( 'style' ) ).toStrictEqual( '--wmde-b-progress-width: 100%;' );
	} );
} );
