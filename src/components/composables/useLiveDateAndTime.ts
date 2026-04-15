import type { Ref } from 'vue';
import { inject, ref } from 'vue';
import type { DateAndTime } from '@src/utils/DynamicContent/DateAndTime';
import type { Timer } from '@src/utils/Timer';

type ReturnType = {
	liveDateAndTime: Ref<DateAndTime>;
	startTimer: () => void;
	stopTimer: () => void;
};

export function useLiveDateAndTime( getCurrentDateAndTime: () => DateAndTime ): ReturnType {
	const timer = inject<Timer>( 'timer' );
	const timerId = ref<number>( 0 );
	const liveDateAndTime = ref<DateAndTime>( getCurrentDateAndTime() );

	const startTimer = (): void => {
		timerId.value = timer.setInterval( () => {
			liveDateAndTime.value = getCurrentDateAndTime();
		}, 1000 );
	};

	const stopTimer = (): void => {
		timer.clearInterval( timerId.value );
	};

	return {
		liveDateAndTime,
		startTimer,
		stopTimer
	};
}
