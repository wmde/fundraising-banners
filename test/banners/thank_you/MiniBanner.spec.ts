import { describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import MiniBanner from '@banners/thank_you/components/MiniBanner.vue';
import thankYouContent from '@test/fixtures/ThankYouContent';

describe( 'MiniBanner.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return mount( MiniBanner, {
			props: {
				progressBarFillPercentage: 42,
				thankYouContent
			},
			global: {
				mocks: {
					$translate: ( key: string ): string => key
				}
			}
		} );
	};

	it( 'Sets the progress bar width', async () => {
		const wrapper = getWrapper();

		expect( wrapper.find( '.wmde-b-progress' ).attributes( 'style' ) ).toStrictEqual( '--wmde-b-progress-width: 42%;' );
	} );

	it( 'Emits events', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-b-close-button button' ).trigger( 'click' );
		await wrapper.find( '.wmde-b-mini-cta button' ).trigger( 'click' );

		expect( wrapper.emitted( 'close' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'read-more' ).length ).toStrictEqual( 1 );
	} );
} );
