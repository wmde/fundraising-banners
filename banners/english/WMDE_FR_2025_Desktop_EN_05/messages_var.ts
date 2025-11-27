import DynamicCampaignTextEn from '@src/utils/DynamicContent/messages/DynamicCampaignText.en';
import CloseButtonTextEn from '@src/components/ButtonClose/messages/ButtonClose.en';
import { TranslationMessages } from '@src/Translator';
import UpgradeToYearlyEn from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.en';
import SoftCloseEn from '@src/components/SoftClose/messages/SoftClose.en';
import FooterEn from '@src/components/Footer/messages/Footer.en';
import MainDonationFormEn from '@src/components/DonationForm/Forms/messages/MainDonationForm.en';
import FallbackBanner from '@src/components/FallbackBanner/messages/FallbackBanner.en';
import DoubleProgressBarEn from '@src/components/ProgressBar/messages/DoubleProgressBar.en';

const messages: TranslationMessages = {
	...DynamicCampaignTextEn,
	...CloseButtonTextEn,
	...UpgradeToYearlyEn,
	...SoftCloseEn,
	...FooterEn,
	...MainDonationFormEn,
	...FallbackBanner,
	...DoubleProgressBarEn,
	'already-donated-link': 'I\'ve already donated',
	'upgrade-to-yearly-copy': '<p>Every year we are dependent on the support of people like you. Yearly donations ' +
		'help sustainably and enable long term development.</p>' +
		'<p>No risks attached, you can tell us to stop at any time.</p>',
	'upgrade-to-yearly-header': 'Please make it {{amount}} yearly!',
	'visitors-vs-donors-sentence': 'Our fundraising appeal is displayed over {{millionImpressionsPerDay}} million' +
' times a day, and currently only {{totalNumberOfDonors}} people have donated.',
};

export default messages;
