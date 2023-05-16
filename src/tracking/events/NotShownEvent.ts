import { EventData } from '@src/tracking/EventData';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';

export class NotShownEvent implements EventData {
	public readonly eventName: string;
	public readonly customData: Record<string, string|number>;
	public readonly feature: string = 'BannerConductor';

	public constructor( reason: BannerNotShownReasons, bannerSize: number ) {
		this.eventName = reason;
		this.customData = { bannerSize };
	}
}
