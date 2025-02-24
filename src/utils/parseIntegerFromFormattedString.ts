/**
 * This takes in an English or German formatted (float or integer looking) amount as a string and converts it to an integer (cent amount)
 * @returns amount in cents
 */
export function parseIntegerFromFormattedString( amountStr: string ): number {
	// Replace all commas with dots and then remove all dots except for the last one
	amountStr = amountStr.replace( /,/g, '.' );
	amountStr = amountStr.replace( /[.](?=.*[.])/g, '' );

	// Remove all non-numeric chars
	amountStr = amountStr.replace( /[^0-9.]/g, '' );

	const amountNumber = Number( amountStr );
	if ( isNaN( amountNumber ) ) {
		return 0;
	}

	// turn euro float into integer (cent) amount
	return Math.trunc( amountNumber * 100 );
}
