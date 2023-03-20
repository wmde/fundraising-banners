import CampaignDays from '@src/utils/CampaignDays';
import { Translator } from '@src/Translator';

export class DaysLeft {
	private readonly campaignDays: CampaignDays;
	private readonly translator: Translator;

	constructor( campaignDays: CampaignDays, translator: Translator ) {
		this.campaignDays = campaignDays;
		this.translator = translator;
	}

	public get(): string {
		return this.translator.translate( 'prefix-days-left' ) + ' ' +
			this.campaignDays.getNumberOfDaysUntilCampaignEnd() + ' ' + this.getDayTranslation() + ' ' +
			this.translator.translate( 'suffix-days-left' );
	}

	private getDayTranslation(): string {
		return this.campaignDays.getNumberOfDaysUntilCampaignEnd() === 1 ?
			this.translator.translate( 'day-singular' ) :
			this.translator.translate( 'day-plural' );
	}

}
