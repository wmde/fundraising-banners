import { ref, Ref } from 'vue';
import { DateAndTime } from '@src/utils/DynamicContent/DateAndTime';

type ReturnType = {
	liveDateAndTime: Ref<DateAndTime>;
	startTimer: () => void;
	stopTimer: () => void;
}

export function useLiveDateAndTime( getCurrentDateAndTime: () => DateAndTime ): ReturnType {
	const timer = ref<number>( 0 );
	const liveDateAndTime = ref<DateAndTime>( getCurrentDateAndTime() );

	const startTimer = (): void => {
		timer.value = window.setInterval( () => {
			liveDateAndTime.value = getCurrentDateAndTime();
		}, 1000 );
	};

	const stopTimer = (): void => {
		window.clearInterval( timer.value );
	};

	return {
		liveDateAndTime,
		startTimer,
		stopTimer
	};
}
