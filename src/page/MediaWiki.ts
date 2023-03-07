import { BannerEvent } from '@src/tracking/BannerEvent';
import { SizeIssue } from '@src/tracking/SizeIssue';

export interface MediaWiki {
	config: { get: ( item: string ) => any },
	track: ( name: string, trackingData: BannerEvent|SizeIssue ) => void,
	centralNotice: any,
	isShowingContentPage: () => boolean,
	isContentHiddenByLightbox: () => boolean,
	isInArticleNamespace: () => boolean,
}

export interface MwWindow extends Window {
	mw: MediaWiki
}

declare let window: MwWindow;

window.mw.isShowingContentPage = (): boolean => window.mw.config.get( 'wgAction' ) === 'view';
window.mw.isContentHiddenByLightbox = (): boolean => document.getElementsByClassName( 'mw-mmv-lightbox-open' ).length > 0;
window.mw.isInArticleNamespace = (): boolean => {
	const namespaceNumber = window.mw.config.get( 'wgNamespaceNumber' );
	const pageName = window.mw.config.get( 'wgRelevantPageName' );

	if ( namespaceNumber === 0 ) {
		return true;
	}

	// dewiki main page is in nameSpace 4, and we show banners there
	if ( namespaceNumber === 4 && pageName === 'Wikipedia:Hauptseite' ) {
		return true;
	}

	return false;
};

export default window.mw;
