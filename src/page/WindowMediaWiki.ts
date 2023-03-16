import { BannerEvent } from '@src/tracking/BannerEvent';
import { SizeIssue } from '@src/tracking/SizeIssue';
import { MediaWiki } from '@src/page/MediaWiki';

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

}
