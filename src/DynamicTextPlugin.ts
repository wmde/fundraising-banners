import { App } from 'vue';
import { Translator } from '@src/Translator';
import { Formatters } from '@src/utils/DynamicContent/Formatters';
import { CampaignParameters } from '@src/CampaignParameters';
import { ImpressionCount } from '@src/utils/ImpressionCount';
import { getDynamicCampaignText } from '@src/utils/DynamicContent/getDynamicCampaignText';

interface DynamicCampaignTextOptions {
    date: Date,
    translator: Translator,
    formatters: Formatters,
    campaignParameters: CampaignParameters,
    impressionCount: ImpressionCount
}

export default {
	install( app: App, options: DynamicCampaignTextOptions ): void {
		// TODO avoid generating all dynamic campaign text with this call,
		//      instead generate it only when needed (i.e. the property is accessed)
		app.provide( 'dynamicCampaignText', getDynamicCampaignText(
			options.date,
			options.translator,
			options.formatters,
			options.campaignParameters,
			options.impressionCount
		) );
	}
};
