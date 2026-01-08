import { TranslationMessages } from '@src/Translator';
import DynamicCampaignTextDe from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';
import FallbackBanner from '@src/components/FallbackBanner/messages/FallbackBanner.de';
import DoubleProgressBarDe from '@src/components/ProgressBar/messages/DoubleProgressBar.de';
import FooterDe from '@src/components/Footer/messages/Footer.de';

const messages: TranslationMessages = {
	...DynamicCampaignTextDe,
	...FallbackBanner,
	...DoubleProgressBarDe,
	...FooterDe
};

export default messages;
