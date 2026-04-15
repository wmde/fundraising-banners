import type { App } from 'vue';
import type { Translator } from '@src/Translator';
import type { Formatters } from '@src/utils/DynamicContent/Formatters';
import type { CampaignParameters } from '@src/domain/CampaignParameters';
import type { ImpressionCount } from '@src/utils/ImpressionCount';
import DynamicCampaignText from '@src/utils/DynamicContent/DynamicCampaignText';

interface DynamicCampaignTextOptions {
	date: Date;
	translator: Translator;
	formatters: Formatters;
	campaignParameters: CampaignParameters;
	impressionCount: ImpressionCount;
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
