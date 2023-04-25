import CustomAmountFormEn from '@src/components/DonationForm/Forms/messages/CustomAmountForm.en';
import DynamicCampaignTextEn from '@src/utils/DynamicContent/messages/DynamicCampaignText.en';
import { TranslationMessages } from '@src/Translator';
import UpgradeToYearlyEn from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.en';
import SoftCloseEn from '@src/components/SoftClose/messages/SoftClose.en';
import AddressFormEn from '@src/components/DonationForm/Forms/messages/AddressForm.en';
import FooterEn from '@src/components/Footer/messages/Footer.en';
import MainDonationFormEn from '@src/components/DonationForm/Forms/messages/MainDonationForm.en';
import AlreadyDonatedModalEn from '@src/components/AlreadyDonatedModal/translations/AlreadyDonatedModal.en';

const messages: TranslationMessages = {
	...CustomAmountFormEn,
	...DynamicCampaignTextEn,
	...UpgradeToYearlyEn,
	...SoftCloseEn,
	...AddressFormEn,
	...FooterEn,
	...MainDonationFormEn,
	...AlreadyDonatedModalEn
};

export default messages;
