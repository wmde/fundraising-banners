import { onMounted, onUnmounted } from 'vue';

enum ScrollState {
	AboveThreshold,
	BelowThreshold
}

export function useScrollMinimiser( switchThreshold: number, onScrollBelowThreshold: () => void, onScrollAboveThreshold: () => void ): void {
	let scrollState = window.scrollY > switchThreshold ? ScrollState.BelowThreshold : ScrollState.AboveThreshold;

	const scrollHandler = (): void => {
		if ( scrollState === ScrollState.AboveThreshold && window.scrollY > switchThreshold ) {
			onScrollBelowThreshold();
			scrollState = ScrollState.BelowThreshold;
		} else if ( scrollState === ScrollState.BelowThreshold && window.scrollY <= switchThreshold ) {
			onScrollAboveThreshold();
			scrollState = ScrollState.AboveThreshold;
		}
	};

	onMounted( () => {
		window.addEventListener( 'scroll', scrollHandler );
	} );

	onUnmounted( () => {
		window.removeEventListener( 'scroll', scrollHandler );
	} );
}
