import hasLocalStorage from '@src/utils/hasLocalStorage';

export interface LocalCloseTracker {
	setItem(): void;
	getItem(): string;
}

export class LocalStorageCloseTracker implements LocalCloseTracker {
	private readonly _key: 'deDesktop' | 'deMobile' | 'enDesktop';
	private readonly _value: 'with_soft_close' | 'without_soft_close';

	public constructor( key: 'deDesktop' | 'deMobile' | 'enDesktop', value: 'with_soft_close' | 'without_soft_close' ) {
		this._key = key;
		this._value = value;
	}

	public setItem(): void {
		if ( !hasLocalStorage() ) {
			return;
		}
		window.localStorage.setItem( `fundraising.closeChoice2026.${this._key}`, this._value );
	}

	public getItem(): string {
		if ( !hasLocalStorage() ) {
			return '';
		}
		return window.localStorage.getItem( `fundraising.closeChoice2026.${this._key}` ) || '';
	}
}
