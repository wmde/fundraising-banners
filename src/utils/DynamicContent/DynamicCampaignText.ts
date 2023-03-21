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

	constructor( date: Date, translator: Translator, formatters: Formatters, campaignParameters: CampaignParameters, impressionCount: ImpressionCount ) {
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

	private newCampaignDaySentence(): CampaignDaySentence {
		return new CampaignDaySentence( this.getCampaignTimeRange(), this.translator, this.formatters.ordinal );
	}

	public get campaignDaySentence(): string {
		return this.getCachedValue( 'campaignDaySentence', () => this.newCampaignDaySentence().get() );
	}

	public newCurrentDate(): CurrentDate {
		return new CurrentDate( this.date, this.translator, this.formatters.ordinal );
	}

	public get currentDate(): string {
		return this.getCachedValue( 'currentDate', () => this.newCurrentDate().get() );
	}

	public newCurrentDayName(): DayName {
		return new DayName( this.date, this.translator );
	}

	public get currentDayName(): string {
		return this.getCachedValue( 'currentDayName', () => this.newCurrentDayName().get() );
	}
	public newDaysLeftSentence(): DaysLeftSentence {
		return new DaysLeftSentence( this.getCampaignTimeRange(), this.translator );
	}
	public get daysLeftSentence(): string {
		return this.getCachedValue( 'daysLeftSentence', () => this.newDaysLeftSentence().get() );
	}

	public getCampaignProjection(): CampaignProjection {
		if ( this.campaignProjection === undefined ) {
			const projectionRange = new TimeRange(
				startOfDay( this.campaignParameters.campaignProjection.baseDate ),
				endOfDay( this.campaignParameters.endDate )
			);
			this.campaignProjection = new CampaignProjection(
				this.campaignParameters.campaignProjection,
				projectionRange
			);
		}
		return this.campaignProjection;
	}

	private newDonorsNeededSentence(): DonorsNeededSentence {
		return new DonorsNeededSentence(
			this.getCampaignProjection().remainingDonorsNeeded(),
			this.translator
		);
	}

	public get donorsNeededSentence(): string {
		return this.getCachedValue( 'donorsNeededSentence', () => this.newDonorsNeededSentence().get() );
	}

	public get goalDonationSum(): string {
		return this.getCachedValue( 'goalDonationSum', () => this.formatters.currency.millionsNumeric( this.getCampaignProjection().projectedDonationSum() ) );
	}
	public get overallImpressionCount(): number {
		return this.impressionCount.getOverallCount();
	}

	private newVisitorsVsDonorsSentence(): VisitorsVsDonorsSentence {
		return new VisitorsVsDonorsSentence(
			this.translator,
			this.campaignParameters.millionImpressionsPerDay,
			this.getCampaignProjection().projectedDonors()
		);
	}

	public get visitorsVsDonorsSentence(): string {
		return this.getCachedValue( 'visitorsVsDonorsSentence', () => this.newVisitorsVsDonorsSentence().get() );
	}

}
