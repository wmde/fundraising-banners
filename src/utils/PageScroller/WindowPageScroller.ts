import { PageScroller } from '@src/utils/PageScroller/PageScroller';

export class WindowPageScroller implements PageScroller {
	public scrollIntoView( classSelector: string ): void {
		document.querySelector( classSelector )?.scrollIntoView(
			{ behavior: 'smooth', block: 'start', inline: 'start' }
		);
	}

	public scrollToTop(): void {
		window.scrollTo( 0, 0 );
	}

}
