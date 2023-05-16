import { watch } from 'vue';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { Tracker } from '@src/tracking/Tracker';

interface Props {
	isCurrent: boolean;
}

export function useFormStepShownEvent( formStepName: string, tracker: Tracker, props: Props ): void {
	watch( () => props.isCurrent, ( isCurrent, oldIsCurrent ) => {
		if ( oldIsCurrent === false && isCurrent === true ) {
			tracker.trackEvent( new FormStepShownEvent( formStepName ) );
		}
	} );
}
