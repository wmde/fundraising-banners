/**
 * This takes in an English or German formatted amount as a string and converts it to a float
 *
 */
export function parseFloatFromFormattedString( amountStr: string ): number {
	// Replace all commas with dots and then remove all dots except for the last one
	amountStr = amountStr.replace( /,/g, '.' );
	amountStr = amountStr.replace( /[.](?=.*[.])/g, '' );

	// Remove all non-numeric chars
	amountStr = amountStr.replace( /[^0-9.]/g, '' );
	if ( isNaN( Number( amountStr ) ) ) {
		return 0;
	}
	return Number( amountStr );
}
