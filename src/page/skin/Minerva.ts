import { Skin } from '@src/page/skin/Skin';

class Minerva implements Skin {
	searchField: HTMLInputElement;
	searchButton: HTMLButtonElement;
	hideBannerCallback: () => void;
	referencedHideBannerCallback: () => void;

	constructor() {
		this.referencedHideBannerCallback = () => this.hideBannerCallback();

		this.searchField = document.getElementById( 'searchInput' ) as HTMLInputElement;
		this.searchButton = document.getElementById( 'searchIcon' ) as HTMLButtonElement;
		this.searchField.addEventListener( 'focus', this.referencedHideBannerCallback );
		this.searchButton.addEventListener( 'click', this.referencedHideBannerCallback );
	}

	addHideBannerListener( hideBannerListener: () => void ): void {
		this.hideBannerCallback = hideBannerListener;
	}

	removeEventListeners(): void {
		this.searchField.removeEventListener( 'focus', this.referencedHideBannerCallback );
		this.searchButton.removeEventListener( 'click', this.referencedHideBannerCallback );
	}
}

export default Minerva;
