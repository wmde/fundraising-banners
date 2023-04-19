import { beforeEach, describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import BannerWrapper from '../../../../banners/mobile/components/BannerWrapper.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { CloseSources } from '@src/tracking/CloseSources';

const dynamicCampaignContent: DynamicContent = {
	campaignDaySentence: '',
	currentDate: '',
	currentDayName: '',
	daysLeftSentence: 'daysLeftSentence',
	donorsNeededSentence: '',
	goalDonationSum: '',
	overallImpressionCount: 0,
	progressBarContent: {
		percentageTowardsTarget: 42,
		donationTarget: 'donationTarget',
		amountDonated: 'amountDonated',
		amountNeeded: 'amountNeeded'
	},
	visitorsVsDonorsSentence: ''
};

describe( 'BannerWrapper.vue', () => {

	let wrapper: VueWrapper<any>;
	beforeEach( () => {
		wrapper = mount( BannerWrapper, {
			props: {
				bannerState: BannerStates.Visible,
				formController: {
					submitStep: () => {},
					next: () => {},
					previous: () => {},
					onNext: () => {},
					onPrevious: () => {},
					onGoToStep: () => {},
					onSubmit: () => {}
				},
				forms: []
			},
			global: {
				mocks: {
					$translate: ( key: string ): string => key
				},
				provide: {
					dynamicCampaignText: dynamicCampaignContent,
					formActions: { donateWithAddressAction: 'https://example.com', donateWithoutAddressAction: 'https://example.com' }
				}
			}
		} );
	} );

	it( 'Shows the soft close when mini banner is closed', async () => {
		await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );

		expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--soft-closing' );
		expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeTruthy();
		expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
	} );

	it( 'Shows the full page banner when the show button is clicked', async () => {
		await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );

		expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--full-page' );
		expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
	} );

	it( 'Does not show the soft close when full banner is closed', async () => {
		await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
		await wrapper.find( '.wmde-banner-full-close' ).trigger( 'click' );

		expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--full-page' );
		expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeFalsy();
		expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
		expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toBe( CloseSources.FollowUpBanner );
	} );

} );
