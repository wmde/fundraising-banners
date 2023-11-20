/**
 * @deprecated Use RuntimeEnvironment.getBannerDelay() instead. Delete when no archived banners use this.
 */
export default function getBannerDelay( delayValue: number ): number {
	const parameters = window.location.search;
	if ( parameters.match( /devMode/ ) || parameters.match( /devbanner/ ) ) {
		return 1;
	}
	return delayValue;
}
