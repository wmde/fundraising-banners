import hasLocalStorage from '@src/utils/hasLocalStorage';

export interface LocalCloseTracker {
	setItem(): void;
	getItem(): string;
}

type keyType = 'deDesktop' | 'deMobile' | 'enDesktop';
type valueType = 'with_soft_close' | 'with_soft_close_final_impression' | 'without_soft_close';

export class LocalStorageCloseTracker implements LocalCloseTracker {
	private readonly _key: keyType;
	private readonly _value: valueType;

	public constructor( key: keyType, value: valueType ) {
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
