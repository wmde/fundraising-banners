import { beforeEach, describe, expect, it, vitest } from 'vitest';
import PageOrg, { bannerContainerId } from '@src/page/PageOrg';
import { MediaWiki } from '@src/page/MediaWiki';
import { SkinStub } from '../../fixtures/SkinStub';
import { SizeIssueCheckerStub } from '../../fixtures/SizeIssueCheckerStub';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';

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

		expect( ( new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() ) ).getReasonToNotShowBanner() ).toBe( null );
	} );

	it( 'hides when not in article namespace', function () {
		mediaWiki.isInArticleNamespace = vitest.fn().mockReturnValue( false );
		mediaWiki.isShowingContentPage = vitest.fn().mockReturnValue( true );
		mediaWiki.isContentHiddenByLightbox = vitest.fn().mockReturnValue( false );

		expect( ( new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() ) ).getReasonToNotShowBanner() ).toBe( BannerNotShownReasons.DisallowedNamespace );
	} );

	it( 'hides when not on content page', function () {
		mediaWiki.isInArticleNamespace = vitest.fn().mockReturnValue( true );
		mediaWiki.isShowingContentPage = vitest.fn().mockReturnValue( false );
		mediaWiki.isContentHiddenByLightbox = vitest.fn().mockReturnValue( false );

		expect( ( new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() ) ).getReasonToNotShowBanner() ).toBe( BannerNotShownReasons.UserInteraction );
	} );

	it( 'hides when content is hidden by lightbox', function () {
		mediaWiki.isInArticleNamespace = vitest.fn().mockReturnValue( true );
		mediaWiki.isShowingContentPage = vitest.fn().mockReturnValue( true );
		mediaWiki.isContentHiddenByLightbox = vitest.fn().mockReturnValue( true );

		expect( ( new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() ) ).getReasonToNotShowBanner() ).toBe( BannerNotShownReasons.UserInteraction );
	} );

	it( 'hides when there is a size issue', function () {
		mediaWiki.isInArticleNamespace = vitest.fn().mockReturnValue( true );
		mediaWiki.isShowingContentPage = vitest.fn().mockReturnValue( true );
		mediaWiki.isContentHiddenByLightbox = vitest.fn().mockReturnValue( false );

		expect( ( new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub( true ) ) ).getReasonToNotShowBanner() ).toBe( BannerNotShownReasons.SizeIssue );
	} );

	it( 'creates a mount point when getBannerContainer() is called', function () {
		const page = new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() );
		const id = page.getBannerContainer();

		expect( id ).toBe( '#' + bannerContainerId );
		expect( document.body.innerHTML ).toBe( `<div id="${ bannerContainerId }"></div>` );
	} );

	it.todo( 'sends event tracking data' );
} );
