import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';

/**
 * @deprecated Will be removed when the new tracking schema is implemented
 */
export function mapFormStepShownEvent( e: FormStepShownEvent ): WMDELegacyBannerEvent {
	const stepNameToEventLookup: Record<string, string> = {
		UpgradeToYearlyForm: 'upgrade-to-yearly-form-page-shown',
		CustomAmountForm: 'custom-amount-form-page-shown',
		AddressTypeForm: 'address-type-form-page-shown'
	};
	return new WMDELegacyBannerEvent( stepNameToEventLookup[ e.feature ], 1 );
}
