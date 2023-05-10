import { EventData } from '@src/tracking/EventData';

export class AddressTypeFormPageShownEvent implements EventData {
	public static readonly EVENT_NAME = 'address-type-form-page-shown';

	public readonly eventName = AddressTypeFormPageShownEvent.EVENT_NAME;
	public readonly trackingRate = 0.01;
}
