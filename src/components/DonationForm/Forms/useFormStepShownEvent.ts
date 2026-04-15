import { watch } from 'vue';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import type { Tracker } from '@src/tracking/Tracker';
import type { TrackingFeatureName } from '@src/tracking/TrackingEvent';

interface Props {
	isCurrent: boolean;
}

export function useFormStepShownEvent( formStepName: TrackingFeatureName, tracker: Tracker, props: Props ): void {
	watch( () => props.isCurrent, ( isCurrent, oldIsCurrent ) => {
		if ( oldIsCurrent === false && isCurrent === true ) {
			tracker.trackEvent( new FormStepShownEvent( formStepName ) );
		}
	} );
}
