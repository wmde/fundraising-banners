import CustomAmountFormEn from '@src/components/DonationForm/Forms/messages/CustomAmountForm.en';
import DynamicCampaignTextEn from '@src/utils/DynamicContent/messages/DynamicCampaignText.en';
import { TranslationMessages } from '@src/Translator';
import UpgradeToYearlyEn from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.en';
import SoftCloseEn from '@src/components/SoftClose/messages/SoftClose.en';
import AddressFormEn from '@src/components/DonationForm/Forms/messages/AddressForm.en';
import FooterEn from '@src/components/Footer/messages/Footer.en';
import MainDonationFormEn from '@src/components/DonationForm/Forms/messages/MainDonationForm.en';
import AlreadyDonatedModalEn from '@src/components/AlreadyDonatedModal/translations/AlreadyDonatedModal.en';
import FallbackBanner from '@src/components/FallbackBanner/messages/FallbackBanner.en';
import DoubleProgressBarEn from '@src/components/ProgressBar/messages/DoubleProgressBar.en';

const messages: TranslationMessages = {
	...CustomAmountFormEn,
	...DynamicCampaignTextEn,
	...UpgradeToYearlyEn,
	...SoftCloseEn,
	...AddressFormEn,
	...FooterEn,
	...MainDonationFormEn,
	...AlreadyDonatedModalEn,
	...FallbackBanner,
	...DoubleProgressBarEn,
	'upgrade-to-yearly-copy': '<p>Every year we are dependent on the support of people like you. Yearly donations ' +
		'help sustainably and enable long term development.</p>' +
		'<p>No risks attached, you can tell us to stop at any time.</p>'
};

export default messages;
