import { CloseChoices } from '@src/domain/CloseChoices';
import hasLocalStorage from '@src/utils/hasLocalStorage';

export interface LocalCloseTracker {
	setItem( closeChoice: CloseChoices ): void;
	getItem(): string;
}

export class LocalStorageCloseTracker implements LocalCloseTracker {
	public setItem( closeChoice: CloseChoices ): void {
		if ( !hasLocalStorage() ) {
			return;
		}
		window.localStorage.setItem( 'fundraising.closeChoice', closeChoice );
	}

	public getItem(): string {
		if ( !hasLocalStorage() ) {
			return '';
		}
		return window.localStorage.getItem( 'fundraising.closeChoice' ) || '';
	}
}
