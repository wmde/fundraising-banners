export interface DynamicProgressBarContent {
	percentageTowardsTarget: number;
	donationTarget: string;
	donationTargetAmount: string;
	amountDonated: string;
	amountDonatedInCents: number;
	amountNeeded: string;
	isLateProgress: boolean;
	dramaText: string;
}
