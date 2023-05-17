export interface TrackingEvent {
	/**
	 * What type of event this is
	 *
	 * Examples: close, click, submit
	 */
	eventName: string;

	/**
	 * Which part of the banner the event comes from.
	 * Can be a Component name or a general feature description like "SoftClose".
	 * Can be empty, if exact source is not needed (defined by Campaigns Team)
	 *
	 * Examples: MainDonationForm, SoftClose
	 */
	feature: string;

	/**
	 * For tracking the same event where the user has a choice between several options or specific actions.
	 * ONLY use this for tracking predefined user interactions.
	 *
	 * Examples: 'increase' or 'decrease' (custom amount), 'recurring' or 'non-recurring' ("upgrade to yearly" form)
	 */
	userChoice: string;

	/**
	 * Event-specific structured data
	 *
	 * Example: Viewport data (banner height, screen width and height) for size issues
	 */
	customData: Record<string, string|number>;
}
