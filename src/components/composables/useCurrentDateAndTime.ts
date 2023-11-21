import { ref, Ref } from 'vue';

type ReturnType = {
	currentDateTime: Ref<string>;
	startTimer: () => void;
	stopTimer: () => void;
}

export function useCurrentDateAndTime( getCurrentDateAndTime: () => string ): ReturnType {
	const timer = ref<number>( 0 );
	const currentDateTime = ref<string>( getCurrentDateAndTime() );

	const startTimer = (): void => {
		timer.value = window.setInterval( () => {
			currentDateTime.value = getCurrentDateAndTime();
		}, 1000 );
	};

	const stopTimer = (): void => {
		window.clearInterval( timer.value );
	};

	return {
		currentDateTime,
		startTimer,
		stopTimer
	};
}
