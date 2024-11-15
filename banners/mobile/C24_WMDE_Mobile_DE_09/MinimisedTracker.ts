import hasLocalStorage from '@src/utils/hasLocalStorage';

/**
 * This feature is to track the minimised state and load the banner
 * minimised on page change. It was removed from the ticket, but
 * I'm leaving it here in case it gets re-added while I'm away.
 */
export interface MinimisedTracker {
	setMinimised( minimised: boolean ): void;
	isMinimised(): boolean;
}

export class LocalStorageMinimisedTracker implements MinimisedTracker {
	public setMinimised( minimised: boolean ): void {
		if ( !hasLocalStorage() ) {
			return;
		}
		window.localStorage.setItem( 'fundraising.minimised', minimised ? 'true' : 'false' );
	}

	public isMinimised(): boolean {
		if ( !hasLocalStorage() ) {
			return false;
		}
		return window.localStorage.getItem( 'fundraising.minimised' ) === 'true';
	}
}
