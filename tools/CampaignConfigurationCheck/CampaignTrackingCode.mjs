export default class CampaignTrackingCode {
	/**
	 * @param {string} campaignTrackingCode
	 */
	constructor( campaignTrackingCode ) {
		const textNumberRegexResult = campaignTrackingCode.match( /^\D*(\d{2})([-_])/ );
		if ( textNumberRegexResult === null ) {
			throw new Error( `Wrong test number format for ${ campaignTrackingCode } ` );
		}
		this.testNumber = textNumberRegexResult[ 1 ];

		const startDateRegexResult = campaignTrackingCode.match( /-(\d{6})$/ );
		if ( startDateRegexResult === null ) {
			throw new Error( `Wrong start date format (should be 6-digit) for ${ campaignTrackingCode } ` );
		}
		this.startDate = startDateRegexResult[ 1 ];
	}
}
