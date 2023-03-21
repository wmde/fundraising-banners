import { App } from 'vue';
import { Translator } from '@src/Translator';
import { Formatters } from '@src/utils/DynamicContent/Formatters';
import { CampaignParameters } from '@src/CampaignParameters';
import { ImpressionCount } from '@src/utils/ImpressionCount';
import DynamicCampaignText from '@src/utils/DynamicContent/DynamicCampaignText';

interface DynamicCampaignTextOptions {
    date: Date,
    translator: Translator,
    formatters: Formatters,
    campaignParameters: CampaignParameters,
    impressionCount: ImpressionCount
}

export default {
	install( app: App, options: DynamicCampaignTextOptions ): void {
		app.provide( 'dynamicCampaignText', new DynamicCampaignText(
			options.date,
			options.translator,
			options.formatters,
			options.campaignParameters,
			options.impressionCount
		) );
	}
};
