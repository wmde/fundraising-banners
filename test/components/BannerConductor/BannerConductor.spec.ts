import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import { PageStub } from '@test/fixtures/PageStub';
import { ResizeHandlerStub } from '@test/fixtures/ResizeHandlerStub';
import { ImpressionCountStub } from '@test/fixtures/ImpressionCountStub';
import { nextTick } from 'vue';

describe( 'BannerConductor.vue', () => {
	beforeEach( () => {
		vi.useFakeTimers();
	} );

	afterEach( () => {
		vi.restoreAllMocks();
	} );

	it.todo( 'sets pending on mounted', async () => {
		const wrapper = shallowMount( BannerConductor, {
			props: {
				page: new PageStub(),
				bannerConfig: { delay: 42, transitionDuration: 5 },
				resizeHandler: new ResizeHandlerStub(),
				banner: {},
				impressionCount: new ImpressionCountStub()
			}
		} );

		console.log( wrapper.attributes( 'class' ) );
		await nextTick();
		await nextTick();
		console.log( wrapper.attributes( 'class' ) );
		await nextTick();
		await vi.runAllTimersAsync();
		console.log( wrapper.attributes( 'class' ) );
	} );

	it.todo( 'moves to not shown state when there is a reason', () => {} );

	it.todo( 'moves to showing then visible state when banner should be shown', () => {} );

	it.todo( 'updates current state on resize', () => {} );

	it.todo( 'updates current state on content change', () => {} );

	it.todo( 'moves to closed state when an page event that should hide the banner happens', () => {} );

	it.todo( 'moves to closed state when donor closes banner', () => {} );
} );
