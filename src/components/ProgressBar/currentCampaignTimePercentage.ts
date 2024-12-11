import { CampaignParameters } from '@src/domain/CampaignParameters';
import TimeRange from '@src/utils/TimeRange';

/**
 * Calculate how much of the campaign has passed (in percent), using the campaign start and end date and the current date
 */
export function currentCampaignTimePercentage( date: Date, campaignParameters: CampaignParameters ): number {
	const timeRange = TimeRange.createFromStrings(
		campaignParameters.startDate,
		campaignParameters.endDate,
		date
	);

	return Math.min( timeRange.minutesSinceStart() / timeRange.minutesBetweenStartAndEnd() * 100, 100 );
}
