import { describe, expect, it } from 'vitest';
import { CampaignDaySentence } from '@src/utils/DynamicContent/generators/CampaignDaySentence';
import CampaignDays from '@src/utils/CampaignDays';
import { Translator } from '@src/Translator';
import { OrdinalDe } from '@src/utils/DynamicContent/formatters/OrdinalDe';
import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';

const beforeStartDate = new Date( 2023, 10, 10 );
const startDate = new Date( 2023, 10, 11 );
const after24HoursDate = new Date( 2023, 10, 12 );
const after48HoursDate = new Date( 2023, 10, 13 );
const urgencyDate = new Date( 2023, 11, 22 );
const secondLastDayDate = new Date( 2023, 11, 30 );
const lastDayDate = new Date( 2023, 11, 31 );
const endDate = new Date( 2023, 11, 31, 23, 59, 59 );
const afterEndDate = new Date( 2024, 0, 1 );

const staticOrdinal: Ordinal = {
	get: ( figure: number ) => figure + 'sth'
};

describe( 'CampaignDaySentence', function () {
	it( 'returns correct sentence when the campaign has not started yet', () => {
		const campaignDays = new CampaignDays( startDate, endDate, beforeStartDate );
		const campaignDaySentence = new CampaignDaySentence( campaignDays, new Translator( {} ), new OrdinalDe() );

		expect( campaignDaySentence.get() ).toEqual( 'campaign-day-before-campaign' );
	} );

	it( 'returns the correct sentence for the first day of the campaign', () => {
		const campaignDays = new CampaignDays( startDate, endDate, after24HoursDate );
		const campaignDaySentence = new CampaignDaySentence( campaignDays, new Translator( {} ), new OrdinalDe() );

		expect( campaignDaySentence.get() ).toEqual( 'campaign-day-first-day' );
	} );

	it( 'returns the correct sentence from the second day of the campaign onwards', () => {
		const campaignDays = new CampaignDays( startDate, endDate, after48HoursDate );
		const campaignDaySentence = new CampaignDaySentence( campaignDays, new Translator( {} ), new OrdinalDe() );

		expect( campaignDaySentence.get() ).toEqual( 'campaign-day-nth-day' );
	} );

	it( 'adds an ordinal to the main campaign text', () => {
		const campaignDays = new CampaignDays( startDate, endDate, after48HoursDate );
		const campaignDaySentence = new CampaignDaySentence( campaignDays, new Translator( { 'campaign-day-nth-day': '{{days}}' } ), staticOrdinal );

		expect( campaignDaySentence.get() ).toEqual( '2sth' );
	} );

	it( 'returns the urgency sentence when the campaign is getting close to the end', () => {
		const campaignDays = new CampaignDays( startDate, endDate, urgencyDate );
		const campaignDaySentence = new CampaignDaySentence( campaignDays, new Translator( {} ), new OrdinalDe(), 10 );

		expect( campaignDaySentence.get() ).toEqual( 'campaign-day-only-n-days' );
	} );

	it( 'returns the second last day sentence when the campaign is on the second last day', () => {
		const campaignDays = new CampaignDays( startDate, endDate, secondLastDayDate );
		const campaignDaySentence = new CampaignDaySentence( campaignDays, new Translator( {} ), new OrdinalDe(), 10 );

		expect( campaignDaySentence.get() ).toEqual( 'campaign-day-second-last-day' );
	} );

	it( 'returns the last day sentence when the campaign is on the last day', () => {
		const campaignDays = new CampaignDays( startDate, endDate, lastDayDate );
		const campaignDaySentence = new CampaignDaySentence( campaignDays, new Translator( {} ), new OrdinalDe(), 10 );

		expect( campaignDaySentence.get() ).toEqual( 'campaign-day-last-day' );
	} );

	it( 'returns nothing after the campaign', () => {
		const campaignDays = new CampaignDays( startDate, endDate, afterEndDate );
		const campaignDaySentence = new CampaignDaySentence( campaignDays, new Translator( {} ), new OrdinalDe(), 10 );

		expect( campaignDaySentence.get() ).toEqual( '' );
	} );
} );
