import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { DayName } from '@src/utils/DynamicContent/generators/DayName';
import { Translator } from '@src/Translator';
import { CurrentDate } from '@src/utils/DynamicContent/generators/CurrentDate';
import { Formatters } from '@src/utils/DynamicContent/Formatters';
import { CampaignParameters } from '@src/CampaignParameters';
import TimeRange, { endOfDay, startOfDay } from '@src/utils/TimeRange';
import { DaysLeftSentence } from '@src/utils/DynamicContent/generators/DaysLeftSentence';
import { CampaignDaySentence } from '@src/utils/DynamicContent/generators/CampaignDaySentence';
import { VisitorsVsDonorsSentence } from '@src/utils/DynamicContent/generators/VisitorsVsDonorsSentence';
import { DonorsNeededSentence } from '@src/utils/DynamicContent/generators/DonorsNeededSentence';
import { CampaignProjection } from '@src/utils/DynamicContent/CampaignProjection';

// This function combines all the text generators and returns an implementation of DynamicContent and is sort've used as a factory replacement
// Formatters format bits of text like currency, ordinals ect, generators use them to generate the actual text
// The text generators can be copied over from the old repo one by one and tested individually.
// Pass in required runtime things as function parameters
// The signature might get disgustingly big so maybe think of a better pattern if that happens
export const getDynamicCampaignText = ( date: Date, translator: Translator, formatters: Formatters, campaignParameters: CampaignParameters ): DynamicContent => {

	const campaignTimeRange = new TimeRange(
		startOfDay( campaignParameters.startDate ),
		endOfDay( campaignParameters.endDate )
	);

	const currentTimeRangeForProjection = new TimeRange(
		startOfDay( campaignParameters.campaignProjection.baseDate ),
		endOfDay( campaignParameters.endDate )
	);

	const donationProjection = new CampaignProjection( campaignParameters.campaignProjection, currentTimeRangeForProjection );

	return {
		dayName: ( new DayName( date, translator ) ).get(),
		currentDate: ( new CurrentDate( date, translator, formatters.ordinal ) ).get(),
		daysLeftSentence: ( new DaysLeftSentence( campaignTimeRange, translator ) ).get(),
		campaignDaySentence: ( new CampaignDaySentence( campaignTimeRange, translator, formatters.ordinal ) ).get(),
		visitorsVsDonorsSentence: ( new VisitorsVsDonorsSentence(
			translator,
			campaignParameters.millionImpressionsPerDay,
			donationProjection.projectedDonors()
		) ).get(),
		donorsNeededSentence: ( new DonorsNeededSentence( donationProjection.remainingDonorsNeeded(), translator ) ).get()
	};
};
