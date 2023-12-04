import { ref, Ref } from 'vue';

type ReturnType = {
	currentTime: Ref<string>;
	startTimer: () => void;
	stopTimer: () => void;
}

export function useCurrentTime( getCurrentTime: () => string ): ReturnType {
	const timer = ref<number>( 0 );
	const currentTime = ref<string>( getCurrentTime() );

	const startTimer = (): void => {
		timer.value = window.setInterval( () => {
			currentTime.value = getCurrentTime();
		}, 1000 );
	};

	const stopTimer = (): void => {
		window.clearInterval( timer.value );
	};

	return {
		currentTime,
		startTimer,
		stopTimer
	};
}
