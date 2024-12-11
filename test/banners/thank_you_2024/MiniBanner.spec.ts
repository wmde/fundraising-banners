import { describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import MiniBanner from '@banners/thank_you_2024/components/MiniBanner.vue';

describe( 'MiniBanner.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return mount( MiniBanner, {
			props: {
				progressBarFillPercentage: 42,
				showSuccessContent: true
			},
			global: {
				mocks: {
					$translate: ( key: string ): string => key
				}
			}
		} );
	};

	it( 'Sets the progress bar items', async () => {
		const wrapper = getWrapper();

		expect( wrapper.find( '.wmde-banner-progress-bar' ).attributes( 'style' ) ).toStrictEqual( '--wmde-banner-progress-bar-width: 42%;' );

		expect( wrapper.find( '.wmde-banner-progress-bar-fill-text' ).text() ).toStrictEqual( 'progress-bar-inner-text-win' );

		await wrapper.setProps( { showSuccessContent: false } );

		expect( wrapper.find( '.wmde-banner-progress-bar-fill-text' ).text() ).toStrictEqual( 'progress-bar-inner-text-lose' );
	} );

	it( 'Emits events', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
		await wrapper.find( '.wmde-banner-mini-read-more' ).trigger( 'click' );

		expect( wrapper.emitted( 'close' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'read-more' ).length ).toStrictEqual( 1 );
	} );
} );
