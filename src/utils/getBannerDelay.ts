export default function getBannerDelay( delayValue: number ): number {
	const parameters = window.location.search;
	if ( parameters.match( /devMode/ ) || parameters.match( /devbanner/ ) ) {
		return 1;
	}
	return delayValue;
}
