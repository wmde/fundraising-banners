import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import BannerWrapper from '../../../../banners/mobile/components/BannerWrapper.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { CloseSources } from '@src/tracking/CloseSources';
import { UseOfFundsContent } from '@src/domain/UseOfFunds/UseOfFundsContent';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';

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

const useOfFundsContent: UseOfFundsContent = {
	applicationOfFundsData: [],
	benefitsList: { benefits: [], headline: '' },
	callToAction: '',
	comparison: { citationLabel: '', companies: [], headline: '', paragraphs: [], subhead: '' },
	detailedReports: {
		germany: { intro: '', linkName: '', linkUrl: '' },
		international: { intro: '', linkName: '', linkUrl: '' },
		mixed: { text: '' }
	},
	intro: { headline: '', text: '' },
	orgchart: { headline: '', imageUrl: '', organizationClasses: {}, paragraphs: [] },
	provisional: ''
};

let pageScroller: PageScroller;

describe( 'BannerWrapper.vue', () => {

	let wrapper: VueWrapper<any>;
	beforeEach( () => {
		pageScroller = {
			scrollIntoView: vi.fn(),
			scrollToTop: vi.fn()
		};

		wrapper = mount( BannerWrapper, {
			props: {
				bannerState: BannerStates.Pending,
				formController: {
					submitStep: () => {},
					next: () => {},
					previous: () => {},
					onNext: () => {},
					onPrevious: () => {},
					onGoToStep: () => {},
					onSubmit: () => {}
				},
				forms: [],
				useOfFundsContent,
				pageScroller
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

	it( 'Shows use of funds when the link is clicked from the full banner', async () => {
		await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
		await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );

		expect( wrapper.find( '.banner-modal' ).classes() ).toContain( 'is-visible' );
	} );

	it( 'Hides use of funds when the close link is clicked', async () => {
		await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
		await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
		await wrapper.find( '.banner-modal-close-link' ).trigger( 'click' );

		expect( wrapper.find( '.banner-modal' ).classes() ).not.toContain( 'is-visible' );
	} );

	it( 'Scrolls to the form when the use of funds call to action is clicked', async () => {
		await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
		await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
		await wrapper.find( '.use-of-funds-button' ).trigger( 'click' );

		expect( pageScroller.scrollIntoView ).toHaveBeenCalledOnce();
		expect( pageScroller.scrollIntoView ).toHaveBeenCalledWith( '.wmde-banner-form' );
	} );

	it( 'Plays the mini banner slideshow when the banner becomes visible', async () => {
		await wrapper.setProps( { bannerState: BannerStates.Visible } );

		expect( wrapper.find( '.wmde-banner-slider--playing' ).exists() ).toBeTruthy();
	} );

	it( 'Stops the mini banner slideshow when the full page becomes visible', async () => {
		await wrapper.setProps( { bannerState: BannerStates.Visible } );
		await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );

		expect( wrapper.find( '.wmde-banner-slider--stopped' ).exists() ).toBeTruthy();
	} );

} );
