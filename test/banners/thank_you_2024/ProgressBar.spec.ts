import { describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import ProgressBar from '@banners/thank_you_2024/components/ProgressBar.vue';

describe( 'ProgressBar.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return mount( ProgressBar, {
			props: {
				fillPercentage: 42,
				showSuccessContent: true
			},
			global: {
				mocks: {
					$translate: ( key: string ): string => key
				}
			}
		} );
	};

	it( 'Sets the fill', () => {
		const wrapper = getWrapper();

		expect( wrapper.find( '.wmde-banner-progress-bar' ).attributes( 'style' ) ).toStrictEqual( '--wmde-banner-progress-bar-width: 42%;' );
	} );

	it( 'Sets win and lose items', async () => {
		const wrapper = getWrapper();

		expect( wrapper.find( '.wmde-banner-progress-bar-fill-text' ).text() ).toStrictEqual( 'progress-bar-inner-text-win' );

		await wrapper.setProps( { showSuccessContent: false } );

		expect( wrapper.find( '.wmde-banner-progress-bar-fill-text' ).text() ).toStrictEqual( 'progress-bar-inner-text-lose' );
	} );
} );
