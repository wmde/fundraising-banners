export default class CampaignDays {
	startDate: Date;
	endDate: Date;
	now: Date;

	constructor( startDate: Date, endDate: Date, now: Date = new Date() ) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.now = now;
	}

	campaignHasStarted(): boolean {
		return this.getSecondsSinceCampaignStart() > 0;
	}

	campaignHasEnded(): boolean {
		return this.getSecondsUntilCampaignEnds() < 0;
	}

	getSecondsSinceCampaignStart(): number {
		return Math.floor( ( this.now.getTime() - this.startDate.getTime() ) / 1000 );
	}

	getDaysSinceCampaignStart(): number {
		return Math.floor( this.getSecondsSinceCampaignStart() / ( 60 * 60 * 24 ) );
	}

	getSecondsUntilCampaignEnds(): number {
		return Math.floor( ( this.endDate.getTime() - this.now.getTime() ) / 1000 );
	}

	getSecondsBetweenStartAndEndOfCampaign(): number {
		return Math.floor( ( this.endDate.getTime() - this.startDate.getTime() ) / 1000 );
	}

	getNumberOfDaysUntilCampaignEnd(): number {
		return Math.ceil( this.getSecondsUntilCampaignEnds() / 60 / 60 / 24 );
	}

}

function getDateParts( dateStr: string ): [number, number, number] {
	const result = dateStr.match( /^(\d{4})-(\d{2})-(\d{2})$/ );
	if ( result === null ) {
		throw new Error( 'Wrong date string format' );
	}
	return [
		parseInt( result[ 1 ], 10 ),
		parseInt( result[ 2 ], 10 ),
		parseInt( result[ 3 ], 10 )
	];
}

/**
 * Return date object for the given date, with the time set to 0:00:00
 */
export function startOfDay( dateStr: string ): Date {
	const [ year, month, day ] = getDateParts( dateStr );
	return new Date( year, month - 1, day, 0, 0, 0 );
}

/**
 * Return date object for the given date, with the time set to 23:59:59
 *
 * @param {string} dateStr Date in format YYYY-MM-DD
 * @return {Date}
 */
export function endOfDay( dateStr: string ): Date {
	const [ year, month, day ] = getDateParts( dateStr );
	return new Date( year, month - 1, day, 23, 59, 59 );
}
