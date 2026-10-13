import { describe, expect, it, afterEach, beforeEach, test, vi } from 'vitest';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import { TimerStub } from '@test/fixtures/TimerStub';
import type { Timer } from '@src/utils/Timer';
import { TimerSpy } from '@test/fixtures/TimerSpy';

const defaultTranslate: ( key: string ) => string = ( key: string ) => key;

describe( 'SoftClose', function () {

	beforeEach( () => {
		vi.useFakeTimers();
	} );

	afterEach( () => {
		vi.restoreAllMocks();
	} );

	const getWrapper = ( translate: ( key: string ) => string = defaultTranslate, timer: Timer = null ): { wrapper: VueWrapper<any>, elements: any } => {
		const wrapper = mount( SoftClose, {
			global: {
				mocks: {
					$translate: translate
				},
				provide: {
					timer: timer ?? new TimerStub()
				}
			}
		} );
		const elements = {
			closeXButton: () => wrapper.find( '.wmde-b-soft-close__content > button' ),
			closeButton: () => wrapper.find( '.wmde-b-soft-close__content > div > button:nth-child(3)' ),
			maybeLayerButton: () => wrapper.find( '.wmde-b-soft-close__content > div > button:nth-child(2)' ),
			countdown: () => wrapper.find( '.wmde-b-soft-close__timer' ),
		};

		return { wrapper, elements };
	};

	it( 'should emit close event when user clicks close icon', async () => {
		const { wrapper, elements } = getWrapper();
		await wrapper.setProps( { showCloseIcon: true } );

		await elements.closeXButton().trigger( 'click' );

		expect( wrapper.emitted( 'xIconClose' ).length ).toBe( 1 );
	} );

	it( 'should emit close event when user clicks close button', async () => {
		const { wrapper, elements } = getWrapper();

		await elements.closeButton().trigger( 'click' );

		expect( wrapper.emitted( 'close' ).length ).toBe( 1 );
	} );

	it( 'should emit maybeLater event when user clicks maybe later button', async () => {
		const { wrapper, elements } = getWrapper();

		await elements.maybeLayerButton().trigger( 'click' );

		expect( wrapper.emitted( 'maybeLater' ).length ).toBe( 1 );
	} );

	test.each( [
		'closeXButton',
		'closeButton',
		'maybeLayerButton'
	] )( 'stops the timer on button click', async ( button: string ) => {
		const timer = new TimerSpy();
		const { wrapper, elements } = getWrapper( defaultTranslate, timer );
		await wrapper.setProps( { showCloseIcon: true } );

		await elements[ button ]().trigger( 'click' );

		expect( timer.clearAllCalls ).toBe( 1 );
	} );

	it( 'should display the remaining seconds decremented every second', async () => {
		const translate = ( key: string, templateTags: Record<string, string | number> = {} ): string => {
			return templateTags === undefined ? key : templateTags.seconds?.toString();
		};
		const timer = new TimerSpy();

		const { elements } = getWrapper( translate, timer );

		const seconds = elements.countdown();

		expect( seconds.text() ).toBe( '15' );

		await timer.advanceInterval();
		expect( seconds.text() ).toBe( '14' );

		await timer.advanceInterval();
		expect( seconds.text() ).toBe( '13' );

		await timer.advanceInterval();
		expect( seconds.text() ).toBe( '12' );
	} );

	it( 'should emit timeOutClose when the internal countdown is <= 1', async () => {
		const timer = new TimerSpy();
		const { wrapper } = getWrapper( ( key: string ) => key, timer );

		// The soft close counts down over 15 seconds so we need to keep advancing until it runs out
		for ( let i: number = 0; i < 15; i++ ) {
			await timer.advanceInterval();
		}

		expect( wrapper.emitted( 'timeOutClose' ).length ).toBe( 1 );
	} );
} );
