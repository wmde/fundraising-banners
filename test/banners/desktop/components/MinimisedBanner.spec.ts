import { describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import MinimisedBanner from '@banners/desktop/C24_WMDE_Desktop_DE_00/components/MinimisedBanner.vue';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';

describe( 'MinimisedBanner.vue', () => {

	const getWrapper = (): VueWrapper<any> => {
		return mount( MinimisedBanner, {
			global: {
				provide: {
					dynamicCampaignText: newDynamicContent()
				}
			}
		} );
	};

	it( 'emits close event', () => {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

		expect( wrapper.emitted( 'close' ).length ).toStrictEqual( 1 );
	} );

	it( 'emits maximise events', () => {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-banner-minimised-maximise' ).trigger( 'click' );
		wrapper.find( '.wmde-banner-minimised-submit-button' ).trigger( 'click' );

		expect( wrapper.emitted( 'maximise' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'maximise-cta' ).length ).toStrictEqual( 1 );
	} );
} );
