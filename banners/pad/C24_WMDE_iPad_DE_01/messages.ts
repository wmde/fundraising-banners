import DynamicCampaignText from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';
import { TranslationMessages } from '@src/Translator';
import UpgradeToYearly from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.de';
import SoftClose from '@src/components/SoftClose/messages/SoftClose.de';
import Footer from '@src/components/Footer/messages/Footer.de';
import MainDonationForm from '@src/components/DonationForm/Forms/messages/MainDonationForm.de';
import AddressFormDe from '@src/components/DonationForm/Forms/messages/AddressForm.de';
import AlreadyDonatedModal from '@src/components/AlreadyDonatedModal/translations/AlreadyDonatedModal.de';

const messages: TranslationMessages = {
	...DynamicCampaignText,
	...UpgradeToYearly,
	...SoftClose,
	...Footer,
	...MainDonationForm,
	...AddressFormDe,
	...AlreadyDonatedModal
};

export default messages;
