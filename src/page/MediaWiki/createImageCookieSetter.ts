const HIDE_EVENT_TRACKING_CATEGORY = 'fundraising';

export function createImageCookieSetter( reason: string, durationInSeconds: number, trackingUrl: string ): void {
	const trackingData = {
		duration: String( durationInSeconds ),
		category: HIDE_EVENT_TRACKING_CATEGORY,
		reason: reason
	};

	const baseUrl = new URL( 'https:' + trackingUrl );
	const newParams = new URLSearchParams( [
		...Array.from( baseUrl.searchParams.entries() ),
		...Object.entries( trackingData )
	] ).toString();

	const trackingImgUrl = new URL( `${ baseUrl.origin }${ baseUrl.pathname }?${ newParams }` );

	document.createElement( 'img' ).src = trackingImgUrl.toString();
}
