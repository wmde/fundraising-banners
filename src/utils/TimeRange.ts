const SECONDS_PER_DAY = 86_400;
const SECONDS_PER_MINUTE = 60;

function getDateParts( dateStr: string ): [ number, number, number ] {
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
function startOfDay( dateStr: string ): Date {
	const [ year, month, day ] = getDateParts( dateStr );
	return new Date( year, month - 1, day );
}

/**
 * Return date object for the given date, with the time set to 23:59:59
 *
 * @param {string} dateStr Date in format YYYY-MM-DD
 * @return {Date}
 */
function startOfNextDay( dateStr: string ): Date {
	const [ year, month, day ] = getDateParts( dateStr );
	return new Date( year, month - 1, day + 1 );
}

export default class TimeRange {
	private _startDate: Date;
	private _endDate: Date;
	private _now: Date = new Date();

	public constructor( startDate: Date, endDate: Date, now: Date = new Date() ) {
		if ( endDate.getTime() - startDate.getTime() <= 0 ) {
			throw new Error( 'start date must not be larger than end date' );
		}
		this._startDate = startDate;
		this._endDate = endDate;
		this._now = now;
	}

	public static createFromStrings( start: string, end: string, now: Date = new Date() ): TimeRange {
		return new TimeRange(
			startOfDay( start ),
			startOfNextDay( end ),
			now
		);
	}

	public hasStarted(): boolean {
		return this.secondsSinceStart() > 0;
	}

	public hasEnded(): boolean {
		return this.secondsUntilEnd() < 0;
	}

	public secondsSinceStart(): number {
		return Math.floor( ( this._now.getTime() - this._startDate.getTime() ) / 1000 );
	}

	public minutesSinceStart(): number {
		return Math.floor( this.secondsSinceStart() / SECONDS_PER_MINUTE );
	}

	public daysSinceStart(): number {
		return Math.ceil( this.secondsSinceStart() / SECONDS_PER_DAY );
	}

	public secondsUntilEnd(): number {
		return Math.floor( ( this._endDate.getTime() - this._now.getTime() ) / 1000 );
	}

	public secondsBetweenStartAndEnd(): number {
		return Math.floor( ( this._endDate.getTime() - this._startDate.getTime() ) / 1000 );
	}

	public minutesBetweenStartAndEnd(): number {
		return Math.floor( this.secondsBetweenStartAndEnd() / SECONDS_PER_MINUTE );
	}

	public numberOfDaysUntilEnd(): number {
		return Math.ceil( this.secondsUntilEnd() / SECONDS_PER_DAY );
	}

}
