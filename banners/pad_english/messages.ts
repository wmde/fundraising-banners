import DynamicCampaignTextEn from '@src/utils/DynamicContent/messages/DynamicCampaignText.en';
import UpgradeToYearlyEn from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.en';
import FooterEn from '@src/components/Footer/messages/Footer.en';
import MainDonationFormEn from '@src/components/DonationForm/Forms/messages/MainDonationForm.en';
import { TranslationMessages } from '@src/Translator';

const messages: TranslationMessages = {
	...DynamicCampaignTextEn,
	...UpgradeToYearlyEn,
	...FooterEn,
	...MainDonationFormEn
};

export default messages;
