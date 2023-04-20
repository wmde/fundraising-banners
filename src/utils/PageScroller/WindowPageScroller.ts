import { PageScroller } from '@src/utils/PageScroller/PageScroller';

export class WindowPageScroller implements PageScroller {
	public scrollIntoView( classSelector: string ): void {
		document.querySelector( classSelector )?.scrollIntoView(
			{ behavior: 'smooth', block: 'center', inline: 'nearest' }
		);
	}

	public scrollToTop(): void {
		window.scrollTo( 0, 0 );
	}

}
