import { beforeEach, describe, expect, it } from 'vitest';
import DynamicCampaignText from '@src/utils/DynamicContent/DynamicCampaignText';
import { Translator } from '@src/Translator';
import { Formatters } from '@src/utils/DynamicContent/Formatters';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { OrdinalEn } from '@src/utils/DynamicContent/formatters/OrdinalEn';
import { IntegerEn } from '@src/utils/DynamicContent/formatters/IntegerEn';
import { CampaignParameters } from '@src/domain/CampaignParameters';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { ImpressionCount } from '@src/utils/ImpressionCount';

const translator = new Translator( {
	'campaign-day-nth-day': 'campaign day {{days}}',
	'month-name-11': 'current month',
	'day-name-friday': 'current day name',
	'prefix-days-left': 'only',
	'suffix-days-left': 'left',
	'day-singular': 'day',
	'day-plural': 'days',
	'remaining-donors-needed-sentence': '{{donorsNeeded}}',
	'visitors-vs-donors-sentence': '{{millionImpressionsPerDay}}-{{totalNumberOfDonors}}',
	'amount-total': 'Progress total',
	'missing-amount': 'Progress missing'
} );
const formatters: Formatters = { currency: new CurrencyEn(), ordinal: new OrdinalEn(), integer: new IntegerEn() };
const campaignParameters: CampaignParameters = {
	campaignProjection: {
		averageAmountPerDonation: 20,
		donationSumBase: 100_000,
		donationAmountPerMinute: 10.3,
		donationCountBase: 105,
		donationCountPerMinute: 2,
		donationTarget: 9_000_000,
		updatedAt: '2023-11-08'
	},
	endDate: '2023-12-31',
	millionImpressionsPerDay: 42,
	numberOfMembers: 200,
	startDate: '2023-11-03'
};
const impressionCount: ImpressionCount = {
	bannerCount: 42,
	bannerCountIncremented: 43,
	overallCount: 543,
	overallCountIncremented: 544,
	incrementImpressionCounts(): void {}
};

describe( 'DynamicCampaignText', () => {
	let dynamicCampaignText: DynamicContent;

	beforeEach( () => {
		dynamicCampaignText = new DynamicCampaignText(
			new Date( 2023, 10, 10, 12, 0, 0 ),
			translator,
			formatters,
			campaignParameters,
			impressionCount
		);
	} );

	it( 'Gets the campaign day sentence', () => {
		expect( dynamicCampaignText.campaignDaySentence ).toBe( 'campaign day 8th' );
	} );

	it( 'Gets the current date', () => {
		expect( dynamicCampaignText.currentDate ).toBe( 'current month 10th' );
	} );

	it( 'Gets the current day name', () => {
		expect( dynamicCampaignText.currentDayName ).toBe( 'current day name' );
	} );

	it( 'Gets the days left sentence', () => {
		expect( dynamicCampaignText.daysLeftSentence ).toBe( 'only 52 days left' );
	} );

	it( 'Gets the donors needed sentence', () => {
		expect( dynamicCampaignText.donorsNeededSentence ).toBe( '445000' );
	} );

	it( 'Gets the goal donation sum', () => {
		expect( dynamicCampaignText.goalDonationSum ).toBe( '9.0' );
	} );

	it( 'Gets the overall impression count', () => {
		expect( dynamicCampaignText.overallImpressionCount ).toBe( 544 );
	} );

	it( 'Gets the visitors vs donors sentence', () => {
		expect( dynamicCampaignText.visitorsVsDonorsSentence ).toBe( '42-7,305' );
	} );

	it( 'Gets the progress bar content', () => {
		expect( dynamicCampaignText.progressBarContent.percentageTowardsTarget ).toBeCloseTo( 1.523 );
		expect( dynamicCampaignText.progressBarContent.donationTarget ).toBe( 'Progress total €9.0M' );
		expect( dynamicCampaignText.progressBarContent.amountDonated ).toBe( '€0.1M' );
		expect( dynamicCampaignText.progressBarContent.amountNeeded ).toBe( 'Progress missing €8.9M' );
	} );
} );
