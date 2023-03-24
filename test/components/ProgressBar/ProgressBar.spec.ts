import { mount } from '@vue/test-utils';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import { describe, it, expect } from 'vitest';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

describe( 'ProgressBar.vue', () => {

	const dynamicCampaignContent: DynamicContent = {
		campaignDaySentence: '',
		currentDate: '',
		currentDayName: '',
		daysLeftSentence: '',
		donorsNeededSentence: '',
		goalDonationSum: '',
		overallImpressionCount: 0,
		progressBarContent: {
			percentageTowardsTarget: 0,
			donationTarget: '',
			amountDonated: '',
			amountNeeded: ''
		},
		visitorsVsDonorsSentence: ''

	};

	it( 'should do something', () => {
		const wrapper = mount( ProgressBar, {
			props: { amountToShowOnRight: 'TOTAL' },
			provide: { dynamicCampaignText: dynamicCampaignContent }
		} );

		expect( wrapper.find( 'path' ).attributes( 'fill' ) ).toBe( '#FADE00' );
	} );

} );
