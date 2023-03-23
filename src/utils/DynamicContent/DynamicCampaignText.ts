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
	private readonly _date: Date;
	private readonly _translator: Translator;
	private _formatters: Formatters;
	private _campaignParameters: CampaignParameters;
	private _impressionCount: ImpressionCount;
	private _cache: Map<string, string>;
	private _campaignTimeRange: TimeRange;
	private _campaignProjection: CampaignProjection;

	public constructor( date: Date, translator: Translator, formatters: Formatters, campaignParameters: CampaignParameters, impressionCount: ImpressionCount ) {
		this._date = date;
		this._translator = translator;
		this._formatters = formatters;
		this._campaignParameters = campaignParameters;
		this._impressionCount = impressionCount;
		this._cache = new Map<string, string>();
	}

	private getCampaignTimeRange(): TimeRange {
		if ( this._campaignTimeRange === undefined ) {
			this._campaignTimeRange = new TimeRange(
				startOfDay( this._campaignParameters.startDate ),
				endOfDay( this._campaignParameters.endDate )
			);
		}
		return this._campaignTimeRange;
	}

	private getCachedValue( key: string, valueFunc: () => string ): string {
		if ( !this._cache.has( key ) ) {
			this._cache.set( key, valueFunc() );
		}
		return this._cache.get( key );
	}

	public get campaignDaySentence(): string {
		return this.getCachedValue( 'campaignDaySentence', () => {
			return new CampaignDaySentence( this.getCampaignTimeRange(), this._translator, this._formatters.ordinal ).getText();
		} );
	}

	public get currentDate(): string {
		return this.getCachedValue( 'currentDate', () => {
			return new CurrentDate( this._date, this._translator, this._formatters.ordinal ).getText();
		} );
	}

	public get currentDayName(): string {
		return this.getCachedValue( 'currentDayName', () => {
			return new DayName( this._date, this._translator ).getText();
		} );
	}

	public get daysLeftSentence(): string {
		return this.getCachedValue( 'daysLeftSentence', () => {
			return new DaysLeftSentence( this.getCampaignTimeRange(), this._translator ).getText();
		} );
	}

	public getCampaignProjection(): CampaignProjection {
		if ( this._campaignProjection === undefined ) {
			const projectionRange = new TimeRange(
				startOfDay( this._campaignParameters.campaignProjection.updatedAt ),
				endOfDay( this._campaignParameters.endDate )
			);
			this._campaignProjection = new CampaignProjection(
				this._campaignParameters.campaignProjection,
				projectionRange
			);
		}
		return this._campaignProjection;
	}

	public get donorsNeededSentence(): string {
		return this.getCachedValue( 'donorsNeededSentence', () => {
			return new DonorsNeededSentence(
				this.getCampaignProjection().remainingNumberOfDonationsNeeded(),
				this._translator
			).getText();
		} );
	}

	public get goalDonationSum(): string {
		return this.getCachedValue( 'goalDonationSum', () => {
			return this._formatters.currency.millionsNumeric( this.getCampaignProjection().projectedDonationSum() );
		} );
	}

	public get overallImpressionCount(): number {
		// Add +1 because this value is not reactive. The banner would show 0 on the first impression of a banner.
		// Even though this value gets increased, the value will not be (reactively) updated in the banner text.
		// TODO research ways to make this reactive to not have to add 1 here manually
		return this._impressionCount.overallCount + 1;
	}

	public get visitorsVsDonorsSentence(): string {
		return this.getCachedValue( 'visitorsVsDonorsSentence', () => {
			return new VisitorsVsDonorsSentence(
				this._translator,
				this._campaignParameters.millionImpressionsPerDay,
				this.getCampaignProjection().projectedDonationCount()
			).getText();
		} );
	}
}
