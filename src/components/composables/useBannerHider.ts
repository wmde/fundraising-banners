import { EmitFn, onMounted, onUnmounted } from 'vue';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';

export function useBannerHider( hideUnder: number, emit: EmitFn<'bannerClosed'[]> ): void {
	const onResize = (): void => {
		if ( window.innerWidth < hideUnder ) {
			emit( 'bannerClosed', new CloseEvent( 'MainBanner', CloseChoices.WindowSizeBelowMin ) );
		}
	};

	onMounted( () => {
		window.addEventListener( 'resize', onResize );
	} );

	onUnmounted( () => {
		window.removeEventListener( 'resize', onResize );
	} );
}
