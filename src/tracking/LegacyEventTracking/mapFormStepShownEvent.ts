import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { WMDEBannerEvent } from '@src/tracking/WPORG/WMDEBannerEvent';

export function mapFormStepShownEvent( e: FormStepShownEvent ): WMDEBannerEvent {
	const stepNameToEventLookup: Record<string, string> = {
		UpgradeToYearlyForm: 'upgrade-to-yearly-form-page-shown',
		CustomAmountForm: 'custom-amount-form-page-shown',
		AddressTypeForm: 'address-type-form-page-shown'
	};
	return new WMDEBannerEvent( stepNameToEventLookup[ e.feature ] );
}
