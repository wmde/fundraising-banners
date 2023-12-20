import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import ProgressBar from '@src/components/ProgressBar/DoubleProgressBar.vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

describe( 'DoubleProgressBar.vue', () => {
	let dynamicCampaignContent: DynamicContent;

	beforeEach( () => {
		dynamicCampaignContent = {
			campaignDaySentence: '',
			currentDate: '',
			getCurrentDateAndTime: (): string => '',
			getCurrentTime: (): string => '',
			currentDayName: '',
			daysLeftSentence: 'daysLeftSentence',
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
			visitorsVsDonorsSentence: ''
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
