import { Skin } from '@src/page/skin/Skin';

class Minerva implements Skin {
	private _searchField: HTMLInputElement;
	private _searchButton: HTMLButtonElement;
	private _hideBannerCallback: () => void;
	private readonly _referencedHideBannerCallback: () => void;

	public constructor() {
		this._referencedHideBannerCallback = (): void => this._hideBannerCallback();

		this._searchField = document.getElementById( 'searchInput' ) as HTMLInputElement;
		this._searchButton = document.getElementById( 'searchIcon' ) as HTMLButtonElement;
		this._searchField.addEventListener( 'focus', this._referencedHideBannerCallback );
		this._searchButton.addEventListener( 'click', this._referencedHideBannerCallback );
	}

	public addHideBannerListener( hideBannerListener: () => void ): void {
		this._hideBannerCallback = hideBannerListener;
	}

	public removeEventListeners(): void {
		this._searchField.removeEventListener( 'focus', this._referencedHideBannerCallback );
		this._searchButton.removeEventListener( 'click', this._referencedHideBannerCallback );
	}

	public minimumVisiblePageBeneathBanner(): number {
		return 0;
	}
}

export default Minerva;
