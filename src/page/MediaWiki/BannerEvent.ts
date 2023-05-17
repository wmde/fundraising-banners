import { BannerType } from '@src/domain/BannerType';

/**
 * This interface represents an EventLogging schema on wikipedia.org domains
 *
 * @see TODO Put URL of schema here
 * @see https://phabricator.wikimedia.org/T336359
 */
export interface BannerEvent {
	action: string;
	platform: string;
	language: string;
	test_number: number;
	banner: BannerType;
	campaign_name: string;
	banner_name: string;
	feature: string;
	user_interaction: string;
	event_rate: number;
	custom_data: Record<string, string|number>;
}
