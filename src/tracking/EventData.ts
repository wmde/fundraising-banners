export interface EventData {
	eventName: string;
	feature: string;
	customData: Record<string, string|number>;
}
