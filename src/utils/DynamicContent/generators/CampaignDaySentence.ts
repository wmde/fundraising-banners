import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import TimeRange from '@src/utils/TimeRange';
import { Translator } from '@src/Translator';
import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';

export class CampaignDaySentence implements TextGenerator {
	private readonly campaignTimeRange: TimeRange;
	private readonly translator: Translator;
	private ordinal: Ordinal;
	/**
	 * We show a more urgent sounding message to donors when days
	 * left in the campaign is below this threshold
	 */
	private readonly urgencyMessageDaysLeft: number;

	public constructor( campaignTimeRange: TimeRange, translator: Translator, ordinal: Ordinal, urgencyMessageDaysLeft: number = 10 ) {
		this.campaignTimeRange = campaignTimeRange;
		this.translator = translator;
		this.ordinal = ordinal;
		this.urgencyMessageDaysLeft = urgencyMessageDaysLeft;
	}

	public getText(): string {
		if ( !this.campaignTimeRange.hasStarted() ) {
			return this.translator.translate( 'campaign-day-before-campaign' );
		}

		if ( this.campaignTimeRange.hasEnded() ) {
			return '';
		}

		const daysUntilCampaignEnds = this.campaignTimeRange.numberOfDaysUntilEnd();
		const daysSinceCampaignStart = this.campaignTimeRange.daysSinceStart();

		if ( daysUntilCampaignEnds === 1 ) {
			return this.translator.translate( 'campaign-day-last-day' );
		} else if ( daysUntilCampaignEnds === 2 ) {
			return this.translator.translate( 'campaign-day-second-last-day' );
		} else if ( daysUntilCampaignEnds <= this.urgencyMessageDaysLeft ) {
			return this.translator.translate( 'campaign-day-only-n-days', {
				days: daysUntilCampaignEnds
			} );
		}

		if ( daysSinceCampaignStart === 1 ) {
			return this.translator.translate( 'campaign-day-first-day' );
		}

		return this.translator.translate( 'campaign-day-nth-day', {
			days: this.ordinal.getFormatted( daysSinceCampaignStart )
		} );
	}
}
