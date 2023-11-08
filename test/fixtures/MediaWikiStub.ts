import { MediaWiki } from '@src/page/MediaWiki/MediaWiki';

export class MediaWikiStub implements MediaWiki {
	public isContentHiddenByLightbox(): boolean {
		return false;
	}

	public isInArticleNamespace(): boolean {
		return false;
	}

	public isShowingContentPage(): boolean {
		return false;
	}

	public preventBannerDisplayForPeriod(): void {
	}

	public preventBannerDisplayForHours(): void {
	}
	public preventBannerDisplayUntilEndOfCampaign(): void {
	}

	public setBannerLoadedButHidden(): void {
	}

	public track(): void {
	}

	public getConfigItem(): any {
	}
}
