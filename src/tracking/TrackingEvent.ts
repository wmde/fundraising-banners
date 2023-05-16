export interface TrackingEvent {
	eventName: string;
	feature: string;
	customData: Record<string, string|number>;
}
