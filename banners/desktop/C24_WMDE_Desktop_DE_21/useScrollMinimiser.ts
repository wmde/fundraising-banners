import { onMounted, onUnmounted, Ref, watch } from 'vue';

export function useScrollMinimiser( switchThreshold: number, hasMinimised: Ref<boolean>, onScrollBelowThreshold: () => void ): void {
	const scrollHandler = (): void => {
		if ( window.scrollY > switchThreshold ) {
			onScrollBelowThreshold();
		}
	};

	onMounted( () => {
		window.addEventListener( 'scroll', scrollHandler );
	} );

	onUnmounted( () => {
		window.removeEventListener( 'scroll', scrollHandler );
	} );

	watch( hasMinimised, () => {
		window.removeEventListener( 'scroll', scrollHandler );
	} );
}
