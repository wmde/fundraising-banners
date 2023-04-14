import CustomAmountFormDe from '@src/components/DonationForm/Forms/messages/CustomAmountForm.de';
import DynamicCampaignTextDe from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';
import { TranslationMessages } from '@src/Translator';
import UpgradeToYearlyDe from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.de';
import SoftCloseDe from '@src/components/SoftClose/messages/SoftClose.de';
import AddressFormDe from '@src/components/DonationForm/Forms/messages/AddressForm.de';
import FooterDe from '@src/components/Footer/messages/Footer.de';
import MainDonationFormDe from '@src/components/DonationForm/Forms/messages/MainDonationForm.de';

const messages: TranslationMessages = {
	...CustomAmountFormDe,
	...DynamicCampaignTextDe,
	...UpgradeToYearlyDe,
	...SoftCloseDe,
	...AddressFormDe,
	...FooterDe,
	...MainDonationFormDe
};

export default messages;
