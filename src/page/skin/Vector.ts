import { Skin } from '@src/page/skin/Skin';

class Vector implements Skin {
	private _searchField: HTMLInputElement;
	private _editButtons: HTMLCollection;
	private _hideBannerCallback: () => void;
	private readonly _referencedHideBannerCallback: () => void;

	public constructor() {
		this._searchField = document.getElementById( 'searchInput' ) as HTMLInputElement;
		this._editButtons = document.getElementsByClassName( 'mw-editsection-visualeditor' );
		this._referencedHideBannerCallback = (): void => this._hideBannerCallback();

		this._searchField.addEventListener( 'focus', this._referencedHideBannerCallback );
		for ( let i = 0; i < this._editButtons.length; i++ ) {
			this._editButtons[ i ].addEventListener( 'click', this._referencedHideBannerCallback );
		}
	}

	public addHideBannerListener( hideBannerListener: () => void ): void {
		this._hideBannerCallback = hideBannerListener;
	}

	public removeEventListeners(): void {
		this._searchField.removeEventListener( 'focus', this._referencedHideBannerCallback );
		for ( let i = 0; i < this._editButtons.length; i++ ) {
			this._editButtons[ i ].removeEventListener( 'click', this._referencedHideBannerCallback );
		}
	}

	public minimumVisiblePageBeneathBanner(): number {
		return 160;
	}
}

export default Vector;
