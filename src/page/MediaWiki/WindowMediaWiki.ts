import { MediaWiki } from '@src/page/MediaWiki/MediaWiki';
import { BannerEvent } from '@src/page/MediaWiki/BannerEvent';
import { SizeIssue } from '@src/page/MediaWiki/SizeIssue';

interface MediaWikiTools {
	config: { get: ( item: string ) => any };
	track: ( name: string, trackingData: BannerEvent|SizeIssue ) => void;
	centralNotice: any;
}

interface MwWindow extends Window {
	mw: MediaWikiTools;
}

declare let window: MwWindow;

export class WindowMediaWiki implements MediaWiki {
	getConfigItem( name: string ): any {
		return window.mw.config.get( name );
	}

	isContentHiddenByLightbox(): boolean {
		return document.getElementsByClassName( 'mw-mmv-lightbox-open' ).length > 0;
	}

	isInArticleNamespace(): boolean {
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

	isShowingContentPage(): boolean {
		return this.getConfigItem( 'wgAction' ) === 'view';
	}

	track( name: string, trackingData: BannerEvent | SizeIssue ): void {
		window.mw.track( name, trackingData );
	}

	preventBannerDisplayForPeriod(): void {
		// TODO check if mw.centralNotice.internal.hide.setHideWithCloseButtonCookies should be called instead when using softclose e.g.
		window.mw.centralNotice.hideBanner();
	}

	preventBannerDisplayUntilEndOfCampaign(): void {
		const endOfYear = new Date( new Date().getFullYear(), 11, 31, 23, 59, 59 );
		const secondsToEndOfYear = Math.abs( ( endOfYear.getTime() - Date.now() ) / 1000 );
		window.mw.centralNotice.customHideBanner( 'donate', secondsToEndOfYear );
	}

}
