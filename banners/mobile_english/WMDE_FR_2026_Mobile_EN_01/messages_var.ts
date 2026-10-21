import DynamicCampaignTextEn from '@src/utils/DynamicContent/messages/DynamicCampaignText.en';
import CloseButtonTextEn from '@src/components/ButtonClose/messages/ButtonClose.en';
import type { TranslationMessages } from '@src/Translator';
import UpgradeToYearlyEn from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.en';
import FooterEn from '@src/components/Footer/messages/Footer.en';
import MainDonationFormEn from '@src/components/DonationForm/Forms/messages/MainDonationForm.en';
import SoftCloseEn from '@src/components/SoftClose/messages/SoftClose.en';
import BannerConductor from '@src/components/BannerConductor/messages/BannerConductor.en';
import ContentCopier from '@src/components/ContentCopier/messages/ContentCopier.en';
import ProgressBar from '@src/components/ProgressBar2026/messages/ProgressBar.en';

const messages: TranslationMessages = {
	...DynamicCampaignTextEn,
	...CloseButtonTextEn,
	...FooterEn,
	...MainDonationFormEn,
	...UpgradeToYearlyEn,
	...SoftCloseEn,
	...BannerConductor,
	...ContentCopier,
	...ProgressBar,

	// custom messages here
	'upgrade-to-yearly-header': 'Please make it {{amount}} yearly!',
	'upgrade-to-yearly-copy': '<p>Every year we are dependent on the support of people like you. Yearly donations help sustainably and enable long term development.</p>' +
		'<p>No risks attached, you can tell us to stop at any time.</p>',
	'mini-banner-already-donated-button': 'I already donated',
	'form-error': 'Please complete the form',
	'intervals-header': 'Select frequency',
	'amounts-header': 'Select amount',
	'payments-header': 'Select payment method',
};

export default messages;
