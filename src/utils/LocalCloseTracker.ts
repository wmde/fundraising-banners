import { CloseChoices } from '@src/domain/CloseChoices';
import hasLocalStorage from '@src/utils/hasLocalStorage';
import { TrackingFeatureName } from '@src/tracking/TrackingEvent';

export interface LocalCloseTracker {
	setItem( feature: TrackingFeatureName, closeChoice: CloseChoices ): void;
	getItem(): string;
}

export class LocalStorageCloseTracker implements LocalCloseTracker {
	public setItem( feature: TrackingFeatureName, closeChoice: CloseChoices ): void {
		if ( !hasLocalStorage() ) {
			return;
		}
		window.localStorage.setItem( 'fundraising.closeChoice2025', `${feature}_${closeChoice}` );
	}

	public getItem(): string {
		if ( !hasLocalStorage() ) {
			return '';
		}
		return window.localStorage.getItem( 'fundraising.closeChoice2025' ) || '';
	}
}
