import { Skin } from '@src/page/skin/Skin';

class Vector implements Skin {
	private searchField: HTMLInputElement;
	private editButtons: HTMLCollection;
	private hideBannerCallback: () => void;
	private readonly referencedHideBannerCallback: () => void;

	public constructor() {
		this.searchField = document.getElementById( 'searchInput' ) as HTMLInputElement;
		this.editButtons = document.getElementsByClassName( 'mw-editsection-visualeditor' );
		this.referencedHideBannerCallback = (): void => this.hideBannerCallback();

		this.searchField.addEventListener( 'focus', this.referencedHideBannerCallback );
		for ( let i = 0; i < this.editButtons.length; i++ ) {
			this.editButtons[ i ].addEventListener( 'click', this.referencedHideBannerCallback );
		}
	}

	public addHideBannerListener( hideBannerListener: () => void ): void {
		this.hideBannerCallback = hideBannerListener;
	}

	public removeEventListeners(): void {
		this.searchField.removeEventListener( 'focus', this.referencedHideBannerCallback );
		for ( let i = 0; i < this.editButtons.length; i++ ) {
			this.editButtons[ i ].removeEventListener( 'click', this.referencedHideBannerCallback );
		}
	}

	public minimumVisiblePageBeneathBanner(): number {
		return 160;
	}
}

export default Vector;
