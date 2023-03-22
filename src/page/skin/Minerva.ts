import { Skin } from '@src/page/skin/Skin';

class Minerva implements Skin {
	private searchField: HTMLInputElement;
	private searchButton: HTMLButtonElement;
	private hideBannerCallback: () => void;
	private readonly referencedHideBannerCallback: () => void;

	public constructor() {
		this.referencedHideBannerCallback = (): void => this.hideBannerCallback();

		this.searchField = document.getElementById( 'searchInput' ) as HTMLInputElement;
		this.searchButton = document.getElementById( 'searchIcon' ) as HTMLButtonElement;
		this.searchField.addEventListener( 'focus', this.referencedHideBannerCallback );
		this.searchButton.addEventListener( 'click', this.referencedHideBannerCallback );
	}

	public addHideBannerListener( hideBannerListener: () => void ): void {
		this.hideBannerCallback = hideBannerListener;
	}

	public removeEventListeners(): void {
		this.searchField.removeEventListener( 'focus', this.referencedHideBannerCallback );
		this.searchButton.removeEventListener( 'click', this.referencedHideBannerCallback );
	}

	public minimumVisiblePageBeneathBanner(): number {
		return 0;
	}
}

export default Minerva;
