import { BannerType } from '@src/domain/BannerType';

export interface BannerEvent {
	action: string;
	platform: string;
	language: string;
	test_number: number;
	banner: BannerType;
	campaign_name: string;
	banner_name: string;
	feature: string;
	event_rate: number;
	custom_data: Record<string, string|number>;
}
