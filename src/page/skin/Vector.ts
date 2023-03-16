import { Skin } from '@src/page/skin/Skin';

class Vector implements Skin {
	searchField: HTMLInputElement;
	editButtons: HTMLCollection;
	hideBannerCallback: () => void;
	referencedHideBannerCallback: () => void;

	constructor() {
		this.searchField = document.getElementById( 'searchInput' ) as HTMLInputElement;
		this.editButtons = document.getElementsByClassName( 'mw-editsection-visualeditor' );
		this.referencedHideBannerCallback = () => this.hideBannerCallback();

		this.searchField.addEventListener( 'focus', this.referencedHideBannerCallback );
		for ( let i = 0; i < this.editButtons.length; i++ ) {
			this.editButtons[ i ].addEventListener( 'click', this.referencedHideBannerCallback );
		}
	}

	addHideBannerListener( hideBannerListener: () => void ): void {
		this.hideBannerCallback = hideBannerListener;
	}

	removeEventListeners(): void {
		this.searchField.removeEventListener( 'focus', this.referencedHideBannerCallback );
		for ( let i = 0; i < this.editButtons.length; i++ ) {
			this.editButtons[ i ].removeEventListener( 'click', this.referencedHideBannerCallback );
		}
	}

	minimumVisiblePageBeneathBanner(): number {
		return 160;
	}
}

export default Vector;
