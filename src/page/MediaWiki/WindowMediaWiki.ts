import { MediaWiki } from '@src/page/MediaWiki/MediaWiki';
import { LegacyBannerEvent } from '@src/page/MediaWiki/LegacyBannerEvent';
import { SizeIssue } from '@src/page/MediaWiki/SizeIssue';

interface MediaWikiTools {
	config: { get: ( item: string ) => any };
	track: ( name: string, trackingData: LegacyBannerEvent|SizeIssue ) => void;
	centralNotice: any;
}

interface MwWindow extends Window {
	mw: MediaWikiTools;
}

declare let window: MwWindow;

export class WindowMediaWiki implements MediaWiki {
	public getConfigItem( name: string ): any {
		return window.mw.config.get( name );
	}

	public isContentHiddenByLightbox(): boolean {
		// mw-mvv-lightbox-open is the CSS class name of the overlay on desktop
		// media-viewer is the CSS class name of the overlay on mobile
		return document.getElementsByClassName( 'mw-mmv-lightbox-open' ).length > 0 ||
			document.getElementsByClassName( 'media-viewer' ).length > 0;
	}

	public isInArticleNamespace(): boolean {
		const namespaceNumber = this.getConfigItem( 'wgNamespaceNumber' );
		const pageName = this.getConfigItem( 'wgRelevantPageName' );

		if ( namespaceNumber === 0 ) {
			return true;
		}

		// dewiki main page is in nameSpace 4, and we show banners there
		if ( namespaceNumber === 4 && pageName === 'Wikipedia:Hauptseite' ) {
			return true;
		}

		return false;
	}

	public isShowingContentPage(): boolean {
		return this.getConfigItem( 'wgAction' ) === 'view';
	}

	public track( name: string, trackingData: LegacyBannerEvent | SizeIssue ): void {
		window.mw.track( name, trackingData );
	}

	public preventBannerDisplayForPeriod(): void {
		// TODO check if mw.centralNotice.internal.hide.setHideWithCloseButtonCookies should be called instead when using softclose e.g.
		window.mw.centralNotice.hideBanner();
	}

	public preventBannerDisplayUntilEndOfCampaign(): void {
		const endOfYear = new Date( new Date().getFullYear(), 11, 31, 23, 59, 59 );
		const secondsToEndOfYear = Math.abs( ( endOfYear.getTime() - Date.now() ) / 1000 );
		window.mw.centralNotice.customHideBanner( 'donate', secondsToEndOfYear );
	}

	public setBannerLoadedButHidden(): void {
		window.mw.centralNotice.setBannerLoadedButHidden();
	}
}
