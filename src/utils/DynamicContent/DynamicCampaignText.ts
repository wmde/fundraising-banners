import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { DayName } from '@src/utils/DynamicContent/generators/DayName';
import { Translator } from '@src/Translator';
import { CurrentDate } from '@src/utils/DynamicContent/generators/CurrentDate';
import { Formatters } from '@src/utils/DynamicContent/Formatters';
import { CampaignParameters } from '@src/CampaignParameters';
import TimeRange, { endOfDay, startOfDay } from '@src/utils/TimeRange';
import { DaysLeftSentence } from '@src/utils/DynamicContent/generators/DaysLeftSentence';
import { CampaignDaySentence } from '@src/utils/DynamicContent/generators/CampaignDaySentence';
import { VisitorsVsDonorsSentence } from '@src/utils/DynamicContent/generators/VisitorsVsDonorsSentence';
import { DonorsNeededSentence } from '@src/utils/DynamicContent/generators/DonorsNeededSentence';
import { CampaignProjection } from '@src/utils/DynamicContent/CampaignProjection';
import { ImpressionCount } from '@src/utils/ImpressionCount';

export default class DynamicCampaignText implements DynamicContent {
	private readonly date: Date;
	private readonly translator: Translator;
	private formatters: Formatters;
	private campaignParameters: CampaignParameters;
	private impressionCount: ImpressionCount;
	private campaignTimeRange: TimeRange;
	private campaignProjection: CampaignProjection;
	private cache: Map<string, string>;

	public constructor( date: Date, translator: Translator, formatters: Formatters, campaignParameters: CampaignParameters, impressionCount: ImpressionCount ) {
		this.date = date;
		this.translator = translator;
		this.formatters = formatters;
		this.campaignParameters = campaignParameters;
		this.impressionCount = impressionCount;
		this.cache = new Map<string, string>();
	}

	private getCampaignTimeRange(): TimeRange {
		if ( this.campaignTimeRange === undefined ) {
			this.campaignTimeRange = new TimeRange(
				startOfDay( this.campaignParameters.startDate ),
				endOfDay( this.campaignParameters.endDate )
			);
		}
		return this.campaignTimeRange;
	}

	private getCachedValue( key: string, valueFunc: () => string ): string {
		if ( !this.cache.has( key ) ) {
			this.cache.set( key, valueFunc() );
		}
		return this.cache.get( key );
	}

	public get campaignDaySentence(): string {
		return this.getCachedValue( 'campaignDaySentence', () => {
			return new CampaignDaySentence( this.getCampaignTimeRange(), this.translator, this.formatters.ordinal ).getText();
		} );
	}

	public get currentDate(): string {
		return this.getCachedValue( 'currentDate', () => {
			return new CurrentDate( this.date, this.translator, this.formatters.ordinal ).getText();
		} );
	}

	public get currentDayName(): string {
		return this.getCachedValue( 'currentDayName', () => {
			return new DayName( this.date, this.translator ).getText();
		} );
	}

	public get daysLeftSentence(): string {
		return this.getCachedValue( 'daysLeftSentence', () => {
			return new DaysLeftSentence( this.getCampaignTimeRange(), this.translator ).getText();
		} );
	}

	public getCampaignProjection(): CampaignProjection {
		if ( this.campaignProjection === undefined ) {
			const projectionRange = new TimeRange(
				startOfDay( this.campaignParameters.campaignProjection.updatedAt ),
				endOfDay( this.campaignParameters.endDate )
			);
			this.campaignProjection = new CampaignProjection(
				this.campaignParameters.campaignProjection,
				projectionRange
			);
		}
		return this.campaignProjection;
	}

	public get donorsNeededSentence(): string {
		return this.getCachedValue( 'donorsNeededSentence', () => {
			return new DonorsNeededSentence(
				this.getCampaignProjection().remainingNumberOfDonationsNeeded(),
				this.translator
			).getText();
		} );
	}

	public get goalDonationSum(): string {
		return this.getCachedValue( 'goalDonationSum', () => {
			return this.formatters.currency.millionsNumeric( this.getCampaignProjection().projectedDonationSum() );
		} );
	}

	public get overallImpressionCount(): number {
		// Add +1 because this value is not reactive. The banner would show 0 on the first impression of a banner.
		// Even though this value gets increased, the value will not be (reactively) updated in the banner text.
		// TODO research ways to make this reactive to not have to add 1 here manually
		return this.impressionCount.getOverallCount() + 1;
	}

	public get visitorsVsDonorsSentence(): string {
		return this.getCachedValue( 'visitorsVsDonorsSentence', () => {
			return new VisitorsVsDonorsSentence(
				this.translator,
				this.campaignParameters.millionImpressionsPerDay,
				this.getCampaignProjection().projectedDonationCount()
			).getText();
		} );
	}
}
