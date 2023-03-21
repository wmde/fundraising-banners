import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import CampaignDays from '@src/utils/CampaignDays';
import { Translator } from '@src/Translator';
import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';

export class CampaignDaySentence implements TextGenerator {
	private readonly campaignDays: CampaignDays;
	private readonly translator: Translator;
	private ordinal: Ordinal;
	/**
	 * We show a more urgent sounding message to donors when days
	 * left in the campaign is below this threshold
	 */
	private readonly urgencyMessageDaysLeft: number;

	constructor( campaignDays: CampaignDays, translator: Translator, ordinal: Ordinal, urgencyMessageDaysLeft: number = 10 ) {
		this.campaignDays = campaignDays;
		this.translator = translator;
		this.ordinal = ordinal;
		this.urgencyMessageDaysLeft = urgencyMessageDaysLeft;
	}

	get(): string {
		if ( !this.campaignDays.campaignHasStarted() ) {
			return this.translator.translate( 'campaign-day-before-campaign' );
		}

		if ( this.campaignDays.campaignHasEnded() ) {
			return '';
		}

		const daysUntilCampaignEnds = this.campaignDays.getNumberOfDaysUntilCampaignEnd();
		const daysSinceCampaignStart = this.campaignDays.getDaysSinceCampaignStart();

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
			days: this.ordinal.get( daysSinceCampaignStart )
		} );
	}
}
