import CustomAmountFormDe from '@src/components/DonationForm/Forms/messages/CustomAmountForm.de';
import DynamicCampaignTextDe from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';
import { TranslationMessages } from '@src/Translator';
import UpgradeToYearlyDe from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.de';
import UpgradeToMonthlyDe from '@src/components/DonationForm/Forms/messages/UpgradeToMonthly.de';
import SoftCloseDe from '@src/components/SoftClose/messages/SoftClose.de';
import AddressFormDe from '@src/components/DonationForm/Forms/messages/AddressForm.de';
import FooterDe from '@src/components/Footer/messages/Footer.de';
import MainDonationFormDe from '@src/components/DonationForm/Forms/messages/MainDonationForm.de';
import AlreadyDonatedModal from '@src/components/AlreadyDonatedModal/translations/AlreadyDonatedModal.de';
import FallbackBanner from '@src/components/FallbackBanner/messages/FallbackBanner.de';

const messages: TranslationMessages = {
	...CustomAmountFormDe,
	...DynamicCampaignTextDe,
	...UpgradeToYearlyDe,
	...UpgradeToMonthlyDe,
	...SoftCloseDe,
	...AddressFormDe,
	...FooterDe,
	...MainDonationFormDe,
	...AlreadyDonatedModal,
	...FallbackBanner,
	'already-donated-go-away-button': 'Im Moment nicht'
};

export default messages;
