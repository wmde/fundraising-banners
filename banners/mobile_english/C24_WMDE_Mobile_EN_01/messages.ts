import CustomAmountForm from '@src/components/DonationForm/Forms/messages/CustomAmountForm.en';
import DynamicCampaignText from '@src/utils/DynamicContent/messages/DynamicCampaignText.en';
import { TranslationMessages } from '@src/Translator';
import SoftClose from '@src/components/SoftClose/messages/SoftClose.en';
import Footer from '@src/components/Footer/messages/Footer.en';
import MainDonationForm from '@src/components/DonationForm/Forms/messages/MainDonationForm.en';
import UpgradeToYearly from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.en';

const messages: TranslationMessages = {
	...CustomAmountForm,
	...DynamicCampaignText,
	...SoftClose,
	...Footer,
	...MainDonationForm,
	...UpgradeToYearly,
	'soft-close-button-already-donated': 'I already donated'
};

export default messages;
