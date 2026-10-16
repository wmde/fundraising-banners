import DynamicCampaignText from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';
import CloseButtonTextDe from '@src/components/ButtonClose/messages/ButtonClose.de';
import type { TranslationMessages } from '@src/Translator';
import UpgradeToYearly from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.de';
import Footer from '@src/components/Footer/messages/Footer.de';
import MainDonationForm from '@src/components/DonationForm/Forms/messages/MainDonationForm.de';
import ProgressBar from '@src/components/ProgressBar2026/messages/ProgressBar.de';
import BannerConductor from '@src/components/BannerConductor/messages/BannerConductor.de';

const messages: TranslationMessages = {
	...DynamicCampaignText,
	...CloseButtonTextDe,
	...UpgradeToYearly,
	...Footer,
	...MainDonationForm,
	...ProgressBar,
	...BannerConductor,
	'upgrade-to-yearly-copy': '<p>Jedes Jahr sind wir auf die Unterstützung von Menschen wie Ihnen angewiesen. ' +
		'Jährliche Spenden helfen uns nachhaltig und ermöglichen langfristige Weiterentwicklungen.</p>' +
		'<p>Sie gehen kein Risiko ein: Jederzeit formlos zu sofort kündbar.</p>',
	'upgrade-to-yearly-header': 'Bitte spenden Sie 5 € jährlich!',
	'already-donated-link': 'Habe schon gespendet',
	'skip-link': 'Weiter zum Formular',
	'form-label': 'Spenden Formular',
	'form-error': 'Bitte Formular vervollständigen',
};

export default messages;
