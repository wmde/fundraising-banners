import DynamicCampaignText from '@src/utils/DynamicContent/messages/DynamicCampaignText.en';
import { TranslationMessages } from '@src/Translator';
import SoftClose from '@src/components/SoftClose/messages/SoftClose.en';
import Footer from '@src/components/Footer/messages/Footer.en';
import MainDonationForm from '@src/components/DonationForm/Forms/messages/MainDonationForm.en';
import UpgradeToYearly from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.en';

const messages: TranslationMessages = {
	...DynamicCampaignText,
	...SoftClose,
	...Footer,
	...MainDonationForm,
	...UpgradeToYearly,
	'soft-close-button-already-donated': 'I already donated',
	'upgrade-to-yearly-copy': '<p>Every year we are dependent on the support of people like you. Yearly donations help sustainably and enable long term development.</p>' +
		'<p>No risks attached, you can tell us to stop at any time.</p>'
};

export default messages;
