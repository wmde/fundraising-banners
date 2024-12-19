import CustomAmountFormDe from '@src/components/DonationForm/Forms/messages/CustomAmountForm.de';
import DynamicCampaignTextDe from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';
import { TranslationMessages } from '@src/Translator';
import UpgradeToYearlyDe from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.de';
import AddressFormDe from '@src/components/DonationForm/Forms/messages/AddressForm.de';
import FooterDe from '@src/components/Footer/messages/Footer.de';
import MainDonationFormDe from '@src/components/DonationForm/Forms/messages/MainDonationForm.de';
import FallbackBanner from '@src/components/FallbackBanner/messages/FallbackBanner.de';
import AlreadyDonatedModal from '@src/components/AlreadyDonatedModal/translations/AlreadyDonatedModal.de';
import SoftCloseDe from '@src/components/SoftClose/messages/SoftClose.de';
import DoubleProgressBarDe from '@src/components/ProgressBar/messages/DoubleProgressBar.de';

const messages: TranslationMessages = {
	...CustomAmountFormDe,
	...DynamicCampaignTextDe,
	...UpgradeToYearlyDe,
	...AddressFormDe,
	...FooterDe,
	...MainDonationFormDe,
	...AlreadyDonatedModal,
	...FallbackBanner,
	...SoftCloseDe,
	...DoubleProgressBarDe,
	'already-donated-go-away-button': 'Im Moment nicht',
	'soft-close-prompt': 'Dürfen wir später nochmal fragen?',
	'upgrade-to-yearly-copy': `<p>Jedes Jahr sind wir auf Menschen wie Sie angewiesen. Jährliche Spenden helfen uns besonders und ermöglichen langfristige Weiterentwicklungen.</p>
		<p>Sie gehen kein Risiko ein: Jederzeit formlos zu sofort kündbar.</p>`,
	'upgrade-to-yearly-no': 'Nein, ich spende einmalig {{amount}}',
	'upgrade-to-yearly-yes': 'Ja, ich spende {{amount}} jährlich',
	'campaign-day-only-n-days': 'Heute sind es nur noch {{days}} Tage bis zum Ende unserer Spendenkampagne.',
	'custom-amount-placeholder': 'Wahlbetrag',
	'upgrade-to-yearly-header': 'Bitte spenden Sie {{amount}} jährlich!',
	'donation-receipt-checkbox-label': 'Bitte senden Sie mir eine steuerlich absetzbare Spendenbescheinigung an meine Postanschrift.'
};

export default messages;
