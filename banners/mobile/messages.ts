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
	...MainDonationFormDe,

	// custom messages here
	'address-type-notice-full': 'Nur so können wir Ihnen eine Spendenquittung per Post zusenden. Außerdem erhalten ' +
		'Sie eine Bestätigung per E-Mail.',
	'address-type-notice-none': 'Sie verzichten sowohl auf eine Spendenquittung als auch auf eine Bestätigung ' +
		'per E-Mail. Sie erhalten von uns keine Information, wenn Wikipedia wieder Hilfe braucht.',
	'soft-close-prompt': 'Wikipedia später unterstützen?'
};

export default messages;
