import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import ProgressBar from '@src/components/ProgressBar/ConfigurableDoubleProgressBar.vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { DateAndTime } from '@src/utils/DynamicContent/DateAndTime';

describe( 'ConfigurableDoubleProgressBar.vue', () => {
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
				isLateProgress: false,
				dramaText: 'alarm!'
			},
			visitorsVsDonorsSentence: '',
			averageDonation: '',
			dramaText: 'alarm!'
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
} );
