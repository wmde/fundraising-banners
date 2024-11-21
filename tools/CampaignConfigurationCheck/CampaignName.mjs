export default class CampaignName {
	/**
	 * @param {string} campaignName
	 */
	constructor( campaignName ) {
		const testNumberRegexResult = campaignName.match( /_(\d{2})$/ );
		if ( testNumberRegexResult === null ) {
			throw new Error( `Cannot parse test number ( "_dd" format) for ${ campaignName } ` );
		}
		this.testNumber = testNumberRegexResult[ 1 ];
	}
}
