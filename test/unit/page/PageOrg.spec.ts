import { beforeEach, describe, expect, it, vitest } from 'vitest';
import PageOrg, { bannerContainerId } from '@src/page/PageOrg';
import { MediaWiki } from '@src/page/MediaWiki';
import { SkinStub } from '../../fixtures/SkinStub';

describe( 'PageOrg', function () {
	let mediaWiki: MediaWiki;

	beforeEach( () => {
		mediaWiki = {
			isInArticleNamespace(): boolean {
				return true;
			},
			isShowingContentPage(): boolean {
				return false;
			},
			isContentHiddenByLightbox(): boolean {
				return false;
			},
			getConfigItem: vitest.fn(),
			track: vitest.fn()
		};
	} );

	it( 'shows when appropriate', function () {
		mediaWiki.isInArticleNamespace = vitest.fn().mockReturnValue( true );
		mediaWiki.isShowingContentPage = vitest.fn().mockReturnValue( true );
		mediaWiki.isContentHiddenByLightbox = vitest.fn().mockReturnValue( false );

		expect( ( new PageOrg( mediaWiki, new SkinStub() ) ).shouldShowBanner() ).toBe( true );
	} );

	it( 'hides when not in article namespace', function () {
		mediaWiki.isInArticleNamespace = vitest.fn().mockReturnValue( false );
		mediaWiki.isShowingContentPage = vitest.fn().mockReturnValue( true );
		mediaWiki.isContentHiddenByLightbox = vitest.fn().mockReturnValue( false );

		expect( ( new PageOrg( mediaWiki, new SkinStub() ) ).shouldShowBanner() ).toBe( false );
	} );

	it( 'hides when not on content page', function () {
		mediaWiki.isInArticleNamespace = vitest.fn().mockReturnValue( true );
		mediaWiki.isShowingContentPage = vitest.fn().mockReturnValue( false );
		mediaWiki.isContentHiddenByLightbox = vitest.fn().mockReturnValue( false );

		expect( ( new PageOrg( mediaWiki, new SkinStub() ) ).shouldShowBanner() ).toBe( false );
	} );

	it( 'hides when content is hidden by lightbox', function () {
		mediaWiki.isInArticleNamespace = vitest.fn().mockReturnValue( true );
		mediaWiki.isShowingContentPage = vitest.fn().mockReturnValue( true );
		mediaWiki.isContentHiddenByLightbox = vitest.fn().mockReturnValue( true );

		expect( ( new PageOrg( mediaWiki, new SkinStub() ) ).shouldShowBanner() ).toBe( false );
	} );

	it( 'creates a mount point when getBannerContainer() is called', function () {
		const page = new PageOrg( mediaWiki, new SkinStub() );
		const id = page.getBannerContainer();

		expect( id ).toBe( '#' + bannerContainerId );
		expect( document.body.innerHTML ).toBe( `<div id="${ bannerContainerId }"></div>` );
	} );

	it( 'sends size issue tracking data', function () {
		const trackMock = vitest.fn();
		mediaWiki.track = trackMock;
		const trackingData = {
			bannerHeight: 100,
			bannerName: 'cool banner',
			eventRate: 1,
			viewportHeight: 4242,
			viewportWidth: 4242
		};

		( new PageOrg( mediaWiki, new SkinStub() ) ).trackSizeIssue( trackingData );

		expect( trackMock ).toHaveBeenCalledOnce();
		expect( trackMock ).toHaveBeenCalledWith( 'event.WMDEBannerSizeIssue', trackingData );
	} );

	it( 'sends event tracking data', function () {
		const trackMock = vitest.fn();
		mediaWiki.track = trackMock;
		const trackingData = {
			bannerAction: '🦡🦡🦡🦡🦡🦡🦡🦡🦡🦡🦡🍄',
			bannerName: 'cool banner',
			eventRate: 1,
			slidesShown: 42,
			finalSlide: 2
		};

		( new PageOrg( mediaWiki, new SkinStub() ) ).trackEvent( trackingData );

		expect( trackMock ).toHaveBeenCalledOnce();
		expect( trackMock ).toHaveBeenCalledWith( 'event.WMDEBannerEvents', trackingData );
	} );
} );
