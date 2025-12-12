import DynamicCampaignTextDe from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';
import CloseButtonTextDe from '@src/components/ButtonClose/messages/ButtonClose.de';
import { TranslationMessages } from '@src/Translator';
import UpgradeToYearlyDe from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.de';
import FooterDe from '@src/components/Footer/messages/Footer.de';
import MainDonationFormDe from '@src/components/DonationForm/Forms/messages/MainDonationForm.de';
import FallbackBanner from '@src/components/FallbackBanner/messages/FallbackBanner.de';
import SoftCloseDe from '@src/components/SoftClose/messages/SoftClose.de';
import DoubleProgressBarDe from '@src/components/ProgressBar/messages/DoubleProgressBar.de';

const messages: TranslationMessages = {
	...DynamicCampaignTextDe,
	...CloseButtonTextDe,
	...UpgradeToYearlyDe,
	...FooterDe,
	...MainDonationFormDe,
	...FallbackBanner,
	...SoftCloseDe,
	...DoubleProgressBarDe,
	'already-donated-link': 'Habe schon gespendet',
	'soft-close-prompt': 'Dürfen wir später nochmal fragen?',
	'upgrade-to-yearly-copy': `<p>Jedes Jahr sind wir auf Menschen wie Sie angewiesen. Jährliche Spenden helfen uns besonders und ermöglichen langfristige Weiterentwicklungen.</p>
		<p>Sie gehen kein Risiko ein: Jederzeit formlos zu sofort kündbar.</p>`,
	'upgrade-to-yearly-no': 'Nein, ich spende einmalig {{amount}}',
	'upgrade-to-yearly-yes': 'Ja, ich spende {{amount}} jährlich',
	'campaign-day-only-n-days': 'Heute sind es nur noch {{days}} Tage bis zum Ende unserer Spendenkampagne.',
	'custom-amount-placeholder': 'Wahlbetrag',
	'upgrade-to-yearly-header': 'Bitte spenden Sie {{amount}} jährlich!',

	'cheering-500': 'Kleiner Betrag, große Wirkung. Danke!',
	'cheering-1000': 'Gute Wahl. Eine der häufigsten Spenden.',
	'cheering-2000': 'Ein starker Beitrag, der viel bewirkt. Toll',
	'cheering-2500': 'Mehr als durchschnittlich gespendet wird!',
	'cheering-5000': 'Wenige Menschen spenden so viel. Danke!',
	'cheering-10000': 'Wow. So viel wird selten gespendet. Danke!',
	'cheering-custom': 'Ihr Betrag, Ihre Wirkung! Herzlichen Dank.',
	'interval-highlight': 'Dauerhaft etwas bewegen.',

	'prefix-days-left': 'Noch',
};

export default messages;
