import TimeRange from '@src/utils/TimeRange';
import { Translator } from '@src/Translator';
import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';

/**
 * Return a sentence that describes how many days are left in the campaign.
 */
export class DaysLeftSentence implements TextGenerator {
	private readonly campaignDays: TimeRange;
	private readonly translator: Translator;

	public constructor( campaignDays: TimeRange, translator: Translator ) {
		this.campaignDays = campaignDays;
		this.translator = translator;
	}

	public getText(): string {
		const numberOfDaysUntilCampaignEnd = this.campaignDays.numberOfDaysUntilEnd();
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
