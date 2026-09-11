// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../node_modules/@types/jquery/JQuery.d.ts" />
import type { LegacyBannerEvent } from '@src/page/MediaWiki/LegacyBannerEvent';
import type { SizeIssue } from '@src/page/MediaWiki/SizeIssue';
import type { BannerEvent } from '@src/page/MediaWiki/BannerEvent';
import type { BannerCategory } from '@src/components/BannerConductor/BannerCategory';

export interface PopupWidgetConfig {
	/* eslint-disable no-undef */
	$content?: JQuery;
	$floatableContainer?: JQuery;
	/* eslint-enable no-undef */
	padded?: boolean;
	autoClose?: boolean;
	align?: 'forwards' | 'backwards' | 'center' | 'force-left' | 'force-right';
	autoFlip?: boolean;
	position?: 'above' | 'below' | 'before' | 'after';
}

/** https://doc.wikimedia.org/oojs-ui/master/js/OO.ui.PopupWidget.html */
export interface PopupWidgetInstance {
	// eslint-disable-next-line no-undef
	$element: JQuery;
	toggle: ( show?: boolean ) => this;
}

export interface MediaWiki {
	getConfigItem( name: string ): any;
	isShowingContentPage: () => boolean;
	isContentHiddenByLightbox: () => boolean;
	isInArticleNamespace: () => boolean;
	isShowingTemporaryAccountBar: () => boolean;
	track: ( name: string, trackingData: BannerEvent|LegacyBannerEvent|SizeIssue ) => void;
	preventBannerDisplayForPeriod: ( bannerCategory: BannerCategory ) => void;
	preventBannerDisplayUntilEndOfCampaign: ( bannerCategory: BannerCategory ) => void;
	preventBannerDisplayForHours: ( hours: number, bannerCategory: BannerCategory ) => void;
	setBannerLoadedButHidden: () => void;
	newPopupWidget: ( config: PopupWidgetConfig ) => Promise<PopupWidgetInstance>;
}
