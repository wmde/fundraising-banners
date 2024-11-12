import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import ProgressBar from '@src/components/ProgressBar/DoubleProgressBar.vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { DateAndTime } from '@src/utils/DynamicContent/DateAndTime';

describe( 'DoubleProgressBar.vue', () => {
	let dynamicCampaignContent: DynamicContent;

	beforeEach( () => {
		dynamicCampaignContent = {
			campaignDaySentence: '',
			currentDate: '',
			getCurrentDateAndTime(): DateAndTime {
				return { currentDate: '', currentTime: '' };
			},
			currentDayName: '',
			daysLeftSentence: 'daysLeftSentence',
			daysPassedSentence: 'daysPassedSentence',
			donorsNeededSentence: '',
			goalDonationSum: '',
			remainingDonationSum: '',
			overallImpressionCount: 0,
			progressBarContent: {
				percentageTowardsTarget: 42,
				donationTarget: 'donationTarget',
				donationTargetAmount: 'donationTargetAmount',
				amountDonated: 'amountDonated',
				amountNeeded: 'amountNeeded',
				isLateProgress: false
			},
			visitorsVsDonorsSentence: '',
			averageDonation: ''
		};
	} );

	it( 'should add the donation percentages as css variables', () => {
		const wrapper = mount( ProgressBar, {
			props: { amountToShowOnRight: 'TARGET' },
			global: {
				mocks: {
					$translate: ( key: string ) => key
				},
				provide: {
					dynamicCampaignText: dynamicCampaignContent,
					currentCampaignTimePercentage: 66
				}
			}
		} );

		expect( wrapper.attributes( 'style' ) ).toContain( '--wmde-banner-progress-bar-width: 42%' );
		expect( wrapper.attributes( 'style' ) ).toContain( '--wmde-banner-progress-bar-time-width: 66%' );
	} );

	it( 'shows the early progress content', () => {
		dynamicCampaignContent.progressBarContent.isLateProgress = false;
		const wrapper = mount( ProgressBar, {
			props: { amountToShowOnRight: 'TARGET' },
			global: {
				mocks: {
					$translate: ( key: string ) => key
				},
				provide: {
					dynamicCampaignText: dynamicCampaignContent,
					currentCampaignTimePercentage: 66
				}
			}
		} );

		expect( wrapper.classes() ).not.toContain( 'is-late-progress' );
		expect( wrapper.find( '.wmde-banner-double-progress-amount .wmde-banner-double-progress-right-text' ).exists() ).toBeTruthy();
		expect( wrapper.find( '.wmde-banner-double-progress-time .wmde-banner-double-progress-right-text' ).exists() ).toBeTruthy();
		expect( wrapper.find( '.amount-needed' ).exists() ).toBeFalsy();
		expect( wrapper.find( '.close-text' ).exists() ).toBeFalsy();
		expect( wrapper.find( '.days-left' ).exists() ).toBeFalsy();
	} );

	it( 'shows the late progress content', () => {
		dynamicCampaignContent.progressBarContent.isLateProgress = true;
		const wrapper = mount( ProgressBar, {
			props: { amountToShowOnRight: 'TARGET' },
			global: {
				mocks: {
					$translate: ( key: string ) => key
				},
				provide: {
					dynamicCampaignText: dynamicCampaignContent,
					currentCampaignTimePercentage: 66
				}
			}
		} );

		expect( wrapper.classes() ).toContain( 'is-late-progress' );
		expect( wrapper.find( '.wmde-banner-double-progress-amount .wmde-banner-double-progress-right-text' ).exists() ).toBeFalsy();
		expect( wrapper.find( '.wmde-banner-double-progress-time .wmde-banner-double-progress-right-text' ).exists() ).toBeFalsy();
		expect( wrapper.find( '.amount-needed' ).exists() ).toBeTruthy();
		expect( wrapper.find( '.close-text' ).exists() ).toBeTruthy();
		expect( wrapper.find( '.days-left' ).exists() ).toBeTruthy();
	} );

} );
