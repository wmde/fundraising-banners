// TODO Discuss in the team if we should rename the properties and remove the docblocks
export interface DonationProjection {
    /**
     * Donation target in million Euros
     */
    goalDonationSum: number,
    /**
     * Last date where the number of donors (donorsBase) and donation sum (baseDonationSum) was measured
     */
    baseDate: string,
    baseDonationSum: number,
    donorsBase: number,
    donationAmountPerMinute: number,
    donorsPerMinute: number,
    // TODO investigate if this is really used for projection. Shouldn't this go into the parameters
    averageAmountPerDonation: number,
    projectedDonors: number,
    donorsNeeded: number,
}

/**
 * Campaign parameters is a value object with string and number primitives used to pass values from
 * the "environment" of the banner (i.e. wikipedia.org or wikipedia.de) to the dynamic text rendering.
 */
export interface CampaignParameters {
    donationProjection: DonationProjection,
    millionImpressionsPerDay: number,
    /**
     * Date in YYYY-MM-DD format
     */
    startDate: string,
    /**
     * Date in YYYY-MM-DD format (code will automatically add the time of 23:59:59)
     */
    endDate: string,
    numberOfMembers: number,
}
