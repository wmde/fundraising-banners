import { beforeEach, describe, expect, it, vitest } from 'vitest';
import PageOrg, { bannerContainerId } from '@src/page/PageOrg';
import { MediaWiki } from '@src/page/MediaWiki/MediaWiki';
import { SkinStub } from '@test/fixtures/SkinStub';
import { SizeIssueCheckerStub } from '@test/fixtures/SizeIssueCheckerStub';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { CloseSources } from '@src/tracking/CloseSources';
import { Vector2 } from '@src/utils/Vector2';

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
			track: vitest.fn(),
			preventBannerDisplayForPeriod: vitest.fn(),
			preventBannerDisplayUntilEndOfCampaign: vitest.fn(),
			setBannerLoadedButHidden: vitest.fn()
		};
	} );

	it( 'shows when appropriate', function () {
		mediaWiki.isInArticleNamespace = vitest.fn().mockReturnValue( true );
		mediaWiki.isShowingContentPage = vitest.fn().mockReturnValue( true );
		mediaWiki.isContentHiddenByLightbox = vitest.fn().mockReturnValue( false );

		expect( ( new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() ) ).getReasonToNotShowBanner( Vector2.zero ) )
			.toBe( null );
	} );

	it( 'hides when not in article namespace', function () {
		mediaWiki.isInArticleNamespace = vitest.fn().mockReturnValue( false );
		mediaWiki.isShowingContentPage = vitest.fn().mockReturnValue( true );
		mediaWiki.isContentHiddenByLightbox = vitest.fn().mockReturnValue( false );

		expect( ( new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() ) ).getReasonToNotShowBanner( Vector2.zero ) )
			.toBe( BannerNotShownReasons.DisallowedNamespace );
	} );

	it( 'hides when not on content page', function () {
		mediaWiki.isInArticleNamespace = vitest.fn().mockReturnValue( true );
		mediaWiki.isShowingContentPage = vitest.fn().mockReturnValue( false );
		mediaWiki.isContentHiddenByLightbox = vitest.fn().mockReturnValue( false );

		expect( ( new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() ) ).getReasonToNotShowBanner( Vector2.zero ) )
			.toBe( BannerNotShownReasons.UserInteraction );
	} );

	it( 'hides when content is hidden by lightbox', function () {
		mediaWiki.isInArticleNamespace = vitest.fn().mockReturnValue( true );
		mediaWiki.isShowingContentPage = vitest.fn().mockReturnValue( true );
		mediaWiki.isContentHiddenByLightbox = vitest.fn().mockReturnValue( true );

		expect( ( new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() ) ).getReasonToNotShowBanner( Vector2.zero ) )
			.toBe( BannerNotShownReasons.UserInteraction );
	} );

	it( 'hides when there is a size issue', function () {
		mediaWiki.isInArticleNamespace = vitest.fn().mockReturnValue( true );
		mediaWiki.isShowingContentPage = vitest.fn().mockReturnValue( true );
		mediaWiki.isContentHiddenByLightbox = vitest.fn().mockReturnValue( false );

		expect( ( new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub( true ) ) ).getReasonToNotShowBanner( Vector2.zero ) )
			.toBe( BannerNotShownReasons.SizeIssue );
	} );

	it( 'creates a mount point when getBannerContainer() is called', function () {
		const page = new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() );
		const id = page.getBannerContainer();

		expect( id ).toBe( '#' + bannerContainerId );
		expect( document.body.innerHTML ).toBe( `<div id="${ bannerContainerId }"></div>` );
	} );

	it( 'stores close cookie for already donated close events', () => {
		const page = new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() );

		page.setCloseCookieIfNecessary( CloseSources.AlreadyDonated );

		expect( mediaWiki.preventBannerDisplayUntilEndOfCampaign ).toHaveBeenCalledOnce();
	} );

	it( 'stores close cookie when user closes soft close', () => {
		const page = new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() );

		page.setCloseCookieIfNecessary( CloseSources.SoftCloseBannerRejected );

		expect( mediaWiki.preventBannerDisplayForPeriod ).toHaveBeenCalledOnce();
	} );

	it( 'stores close cookie when user closes main banner', () => {
		const page = new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() );

		page.setCloseCookieIfNecessary( CloseSources.MainBanner );

		expect( mediaWiki.preventBannerDisplayForPeriod ).toHaveBeenCalledOnce();
	} );

	it( 'stores close cookie when user closes mini banner', () => {
		const page = new PageOrg( mediaWiki, new SkinStub(), new SizeIssueCheckerStub() );

		page.setCloseCookieIfNecessary( CloseSources.MiniBanner );

		expect( mediaWiki.preventBannerDisplayForPeriod ).toHaveBeenCalledOnce();
	} );

	it.todo( 'sends event tracking data in trackEvent()' );
} );
