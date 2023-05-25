import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import { PageStub } from '@test/fixtures/PageStub';
import { ResizeHandlerStub } from '@test/fixtures/ResizeHandlerStub';
import { ImpressionCountStub } from '@test/fixtures/ImpressionCountStub';
import { defineComponent, h, markRaw, nextTick } from 'vue';
import { newBannerStateMachine } from '@src/components/BannerConductor/StateMachine/BannerStateMachine';
import { BannerStateMachineSpy } from '@test/fixtures/BannerStateMachineSpy';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { LegacyCloseSources } from '@src/tracking/LegacyCloseSources';
import { TrackerStub } from '@test/fixtures/TrackerStub';
import { ReactiveProperty } from '@src/domain/StateMachine/ReactiveProperty';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';

vi.mock( '@src/components/BannerConductor/StateMachine/BannerStateMachine', async () => {
	const actual = await vi.importActual( '@src/components/BannerConductor/StateMachine/BannerStateMachine' );
	return {
		// @ts-ignore
		...actual,
		newBannerStateMachine: vi.fn()
	};
} );

describe( 'BannerConductor.vue', () => {

	let stateMachineSpy: BannerStateMachineSpy;

	async function getShownBannerWrapper( page: Page|null = null ): Promise<VueWrapper<any>> {
		const banner = defineComponent( {
			props: {
				bannerState: String
			},
			emits: [
				'bannerClosed',
				'bannerContentChanged'
			],
			render() {
				return h( 'div', { 'class': 'test-banner', 'innerHTML': 'hello' } );
			}
		} );
		const wrapper = mount( BannerConductor, {
			props: {
				page: page ?? new PageStub(),
				bannerConfig: { delay: 42, transitionDuration: 5 },
				resizeHandler: new ResizeHandlerStub(),
				banner: markRaw( banner ),
				impressionCount: new ImpressionCountStub()
			},
			global: {
				provide: {
					tracker: new TrackerStub()
				}
			}
		} );

		// We need to await a few times and run out timers because the banner display flow is asynchronous
		await nextTick();
		await nextTick();
		await nextTick();
		await vi.runAllTimersAsync();

		console.log( wrapper.html() );

		return Promise.resolve( wrapper );
	}

	beforeEach( () => {
		vi.mocked( newBannerStateMachine ).mockImplementation( ( stateRef: ReactiveProperty<BannerState> ) => {
			stateMachineSpy = new BannerStateMachineSpy( stateRef );
			return stateMachineSpy;
		} );
		vi.useFakeTimers();
	} );

	afterEach( () => {
		vi.restoreAllMocks();
	} );

	it( 'runs through correct state flow on mounted', async () => {
		await getShownBannerWrapper();

		expect( stateMachineSpy.statesCalled ).toEqual( [
			BannerStates.Pending,
			BannerStates.Showing,
			BannerStates.Visible
		] );
	} );

	it( 'runs through correct state flow on mounted when there is a reason to not show banner', async () => {
		const page = new PageStub();
		page.getReasonToNotShowBanner = vi.fn().mockReturnValue( BannerNotShownReasons.SizeIssue );

		await getShownBannerWrapper( page );

		expect( stateMachineSpy.statesCalled ).toEqual( [
			BannerStates.Pending,
			BannerStates.NotShown
		] );
	} );

	it( 'passes the banner height to the page on load', async () => {
		const page = new PageStub();
		page.setSpace = vi.fn();

		await getShownBannerWrapper( page );

		// This will be 0 because we shallow mount the component meaning it has no content
		expect( page.setSpace ).toHaveBeenCalledWith( 0 );
	} );

	it( 'shows the page animated with a transition duration', async () => {
		const page = new PageStub();
		page.setAnimated = vi.fn().mockReturnValue( page );
		page.setTransitionDuration = vi.fn().mockReturnValue( page );
		page.showBanner = vi.fn();

		await getShownBannerWrapper( page );

		expect( page.setAnimated ).toHaveBeenCalled();
		expect( page.setTransitionDuration ).toHaveBeenCalledWith( 5 );
		expect( page.showBanner ).toHaveBeenCalled();
	} );

	it.todo( 'updates the page with a new height on content change', async () => {
		const page = new PageStub();
		page.setSpace = vi.fn().mockReturnValue( page );
		const wrapper = await getShownBannerWrapper( page );

		await wrapper.find( '.test-banner' ).trigger( 'banner-content-changed' );

		expect( page.setSpace ).toHaveBeenCalledTimes( 2 );
	} );

	it.todo( 'moves to closed state when donor closes banner', async () => {
		const page = new PageStub();
		page.setCloseCookieIfNecessary = vi.fn().mockReturnValue( page );
		const wrapper = await getShownBannerWrapper( page );
		await wrapper.find( 'anonymous-stub' ).trigger( 'banner-closed', { blah: LegacyCloseSources.MaybeLater } );

		expect( stateMachineSpy.statesCalled ).toEqual( [
			BannerStates.Pending,
			BannerStates.Showing,
			BannerStates.Visible,
			BannerStates.Closed
		] );

		expect( page.setCloseCookieIfNecessary ).toHaveBeenCalledWith( LegacyCloseSources.MaybeLater );
	} );

	it.todo( 'moves to closed state when an page event that should hide the banner happens', () => {
	} );
} );
