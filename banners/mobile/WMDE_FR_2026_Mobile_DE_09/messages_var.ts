import DynamicCampaignTextDe from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';
import CloseButtonTextDe from '@src/components/ButtonClose/messages/ButtonClose.de';
import type { TranslationMessages } from '@src/Translator';
import UpgradeToYearlyDe from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.de';
import FooterDe from '@src/components/Footer/messages/Footer.de';
import MainDonationFormDe from '@src/components/DonationForm/Forms/messages/MainDonationForm.de';
import SoftCloseDe from '@src/components/SoftClose/messages/SoftClose.de';
import BannerConductor from '@src/components/BannerConductor/messages/BannerConductor.de';
import ContentCopier from '@src/components/ContentCopier/messages/ContentCopier.de';

const messages: TranslationMessages = {
	...DynamicCampaignTextDe,
	...CloseButtonTextDe,
	...FooterDe,
	...MainDonationFormDe,
	...UpgradeToYearlyDe,
	...SoftCloseDe,
	...ContentCopier,
	...BannerConductor,

	// custom messages here
	'payment-bank-transfer': 'Überweisung',
	'payment-sofort': 'Sofort',
	'custom-amount-placeholder': 'Andere',
	'yearly-label': 'Jährlich spenden',
	'upgrade-to-yearly-header': 'Bitte spenden Sie {{amount}} jährlich!',
	'upgrade-to-yearly-copy': '<p>Jedes Jahr sind wir auf Menschen wie Sie angewiesen. Jährliche Spenden helfen uns' +
		' besonders und ermöglichen langfristige Weiterentwicklungen.</p>',
	'upgrade-to-yearly-yes-title': '{{amount}} jährlich',
	'upgrade-to-yearly-yes': 'Sie gehen kein Risiko ein: Jederzeit formlos zu sofort kündbar.',
	'upgrade-to-yearly-yes-pill': 'Nachhaltig',
	'upgrade-to-yearly-no-title': '{{amount}} einmalig',
	'upgrade-to-yearly-no': 'Jede Spende hilft - ob einmalig oder jährlich.',
	'campaign-day-only-n-days': 'Heute sind es nur noch {{days}} Tage bis zum Ende unserer Spendenkampagne.',
	'soft-close-prompt': 'Wikipedia später unterstützen?',
	'soft-close-button-already-donated': 'Habe schon gespendet',
	'mini-banner-already-donated-button': 'Habe bereits gespendet',
	'amount-total': 'Spendenziel {{amount}} Millionen Euro',
	'form-error': 'Bitte Formular vervollständigen',
	'photo-credit': 'Photo Credit: {{name}}',
};

export default messages;
