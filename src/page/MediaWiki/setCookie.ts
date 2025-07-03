import { BannerCategory } from '@src/components/BannerConductor/BannerCategory';

const COOKIE_NAME = 'centralnotice_hide_';

export function setCookie( reason: string, created: Date, durationInSeconds: number, cookieNameSuffix: BannerCategory ): void {
	const expiryDate = new Date( created.getTime() );
	expiryDate.setSeconds( created.getSeconds() + durationInSeconds );

	const hideData = {
		v: 1,
		created: Math.floor( created.getTime() / 1000 ),
		reason: reason
	};

	const fullCookieName = COOKIE_NAME + cookieNameSuffix;
	document.cookie = `${ fullCookieName }=${ encodeURIComponent( JSON.stringify( hideData ) ) }; expires=${ expiryDate.toUTCString() }; path=/; SameSite=None; Secure;`;
}
