import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { DayName } from '@src/utils/DynamicContent/generators/DayName';
import { Translator } from '@src/Translator';
import { CurrentDate } from '@src/utils/DynamicContent/generators/CurrentDate';
import { Formatters } from '@src/utils/DynamicContent/Formatters';
import { CampaignParameters } from '@src/domain/CampaignParameters';
import TimeRange from '@src/utils/TimeRange';
import { DaysLeftSentence } from '@src/utils/DynamicContent/generators/DaysLeftSentence';
import { CampaignDaySentence } from '@src/utils/DynamicContent/generators/CampaignDaySentence';
import { VisitorsVsDonorsSentence } from '@src/utils/DynamicContent/generators/VisitorsVsDonorsSentence';
import { DonorsNeededSentence } from '@src/utils/DynamicContent/generators/DonorsNeededSentence';
import { CampaignProjection } from '@src/utils/DynamicContent/CampaignProjection';
import { ImpressionCount } from '@src/utils/ImpressionCount';
import { ProgressBarContent } from '@src/utils/DynamicContent/generators/ProgressBarContent';
import { DynamicProgressBarContent } from '@src/utils/DynamicContent/DynamicProgressBarContent';
import { CurrentDateAndTime } from '@src/utils/DynamicContent/generators/CurrentDateAndTime';
import { CurrentTime } from '@src/utils/DynamicContent/generators/CurrentTime';

export default class DynamicCampaignText implements DynamicContent {
	private readonly _date: Date;
	private readonly _translator: Translator;
	private _formatters: Formatters;
	private _campaignParameters: CampaignParameters;
	private _impressionCount: ImpressionCount;
	private readonly _urgencyMessageDaysLeft: number;
	private _cache: Map<string, string>;
	private _campaignTimeRange: TimeRange;
	private _campaignProjection: CampaignProjection;
	private _progressBarContent: ProgressBarContent;
	private _currentDateAndTime: CurrentDateAndTime;
	private _currentTime: CurrentTime;

	public constructor(
		date: Date,
		translator: Translator,
		formatters: Formatters,
		campaignParameters: CampaignParameters,
		impressionCount: ImpressionCount,
		urgencyMessageDaysLeft: number = 10
	) {
		this._date = date;
		this._translator = translator;
		this._formatters = formatters;
		this._campaignParameters = campaignParameters;
		this._impressionCount = impressionCount;
		this._urgencyMessageDaysLeft = urgencyMessageDaysLeft;
		this._cache = new Map<string, string>();
		this.getCurrentDateAndTime = this.getCurrentDateAndTime.bind( this );
		this.getCurrentTime = this.getCurrentTime.bind( this );
	}

	private getCampaignTimeRange(): TimeRange {
		if ( this._campaignTimeRange === undefined ) {
			this._campaignTimeRange = TimeRange.createFromStrings(
				this._campaignParameters.startDate,
				this._campaignParameters.endDate,
				this._date
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
			return new CampaignDaySentence(
				this.getCampaignTimeRange(),
				this._translator,
				this._formatters.ordinal,
				this._urgencyMessageDaysLeft
			).getText();
		} );
	}

	public get currentDate(): string {
		return this.getCachedValue( 'currentDate', () => {
			return new CurrentDate( this._date, this._translator, this._formatters.ordinal ).getText();
		} );
	}

	/**
	 * Current time returns time to the minute, and needs to be updated dynamically
	 * This means we can't cache the return value, so instead manually cache the CurrentTime object
	 * @deprecated
	 */
	public getCurrentDateAndTime(): string {
		if ( !this._currentDateAndTime ) {
			this._currentDateAndTime = new CurrentDateAndTime( this._translator, this._formatters.ordinal, this._formatters.time );
		}

		return this._currentDateAndTime.getText( new Date() );
	}

	public getCurrentTime(): string {
		if ( !this._currentTime ) {
			this._currentTime = new CurrentTime( this._formatters.time );
		}

		return this._currentTime.getText( new Date() );
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

	private getCampaignProjection(): CampaignProjection {
		if ( this._campaignProjection === undefined ) {
			const projectionRange = TimeRange.createFromStrings(
				this._campaignParameters.campaignProjection.updatedAt,
				this._campaignParameters.endDate,
				this._date
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
			return this._formatters.currency.millionsNumeric( this._campaignParameters.campaignProjection.donationTarget );
		} );
	}

	public get remainingDonationSum(): string {
		return this.getCachedValue( 'currentDonationSum', () => {
			return this._formatters.currency.euroAmountWithThousandSeparator( this.getCampaignProjection().projectedRemainingDonationSum() );
		} );
	}

	public get overallImpressionCount(): number {
		return this._impressionCount.overallCountIncremented;
	}

	public get visitorsVsDonorsSentence(): string {
		return this.getCachedValue( 'visitorsVsDonorsSentence', () => {
			return new VisitorsVsDonorsSentence(
				this._translator,
				this._campaignParameters.millionImpressionsPerDay,
				this.getCampaignProjection().projectedDonationCount(),
				this._formatters.integer
			).getText();
		} );
	}

	public get progressBarContent(): DynamicProgressBarContent {
		if ( this._progressBarContent === undefined ) {
			const projection = this.getCampaignProjection();
			this._progressBarContent = new ProgressBarContent(
				this._campaignParameters.campaignProjection.donationTarget,
				projection.projectedPercentageTowardsTarget(),
				projection.projectedDonationSum(),
				projection.projectedRemainingDonationSum(),
				this._translator,
				this._formatters.currency,
				this._campaignParameters.isLateProgress
			);
		}
		return this._progressBarContent;
	}
}
