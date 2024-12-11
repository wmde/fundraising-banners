export default class KeywordTrackingCode {
	/**
	 * @param {string} trackingCode
	 */
	constructor( trackingCode ) {
		const testNumberRegexResult = trackingCode.match( /^\D*(\d{2})([-_])/ );
		if ( testNumberRegexResult === null ) {
			throw new Error( ` Cannot parse test number ( = "first pair of digits" ) for ${ trackingCode } ` );
		}
		this.testNumber = testNumberRegexResult[ 1 ];

		const startDateRegexResult = trackingCode.match( /-(\d{6})-/ );
		if ( startDateRegexResult === null ) {
			throw new Error( ` Cannot parse 6-digit start date for ${ trackingCode } ` );
		}
		this.startDate = startDateRegexResult[ 1 ];
	}

	/**
	 * @param {CampaignTrackingCode|KeywordTrackingCode} trackingCode
	 * @return {boolean}
	 */
	matchesDate( trackingCode ) {
		return this.startDate === trackingCode.startDate;
	}
}
