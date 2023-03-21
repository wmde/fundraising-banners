import CampaignDays from '@src/utils/CampaignDays';
import { Translator } from '@src/Translator';
import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';

/**
 * Return a sentence that describes how many days are left in the campaign.
 */
export class DaysLeftSentence implements TextGenerator {
	private readonly campaignDays: CampaignDays;
	private readonly translator: Translator;

	constructor( campaignDays: CampaignDays, translator: Translator ) {
		this.campaignDays = campaignDays;
		this.translator = translator;
	}

	public get(): string {
		const numberOfDaysUntilCampaignEnd = this.campaignDays.getNumberOfDaysUntilCampaignEnd();
		return this.translator.translate( 'prefix-days-left' ) + ' ' +
			numberOfDaysUntilCampaignEnd + ' ' +
			this.getDayTranslation( numberOfDaysUntilCampaignEnd ) + ' ' +
			this.translator.translate( 'suffix-days-left' );
	}

	private getDayTranslation( numberOfDaysUntilCampaignEnd: number ): string {
		return numberOfDaysUntilCampaignEnd === 1 ?
			this.translator.translate( 'day-singular' ) :
			this.translator.translate( 'day-plural' );
	}

}
