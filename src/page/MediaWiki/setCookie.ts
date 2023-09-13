const COOKIE_NAME = 'centralnotice_hide_fundraising';

export function setCookie( reason: string, created: Date, durationInSeconds: number ): void {
	const expiryDate = new Date( created.getTime() );
	expiryDate.setSeconds( created.getSeconds() + durationInSeconds );

	const hideData = {
		v: 1,
		created: Math.floor( created.getTime() / 1000 ),
		reason: reason
	};

	document.cookie = `${ COOKIE_NAME }=${ encodeURIComponent( JSON.stringify( hideData ) ) }; expires=${ expiryDate.toUTCString() }; path=/; SameSite=None;`;
}
