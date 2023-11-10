import { describe, it, expect } from 'vitest';

import { DEFAULT_UNKNOWN_EVENT, mapNotShownEvent } from '@src/tracking/LegacyEventTracking/mapNotShownEvent';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';

describe( 'mapNotShownEvent', () => {
	it( 'maps size issues to legacy SizeIssueEvent', () => {
		const legacyEvent = mapNotShownEvent( new NotShownEvent( {
			reason: BannerNotShownReasons.SizeIssue,
			bannerHeight: 700,
			viewportWidth: 1024,
			viewportHeight: 800
		} ) );

		expect( legacyEvent ).toStrictEqual( new WMDESizeIssueEvent(
			'size_issue',
			{
				bannerHeight: 700,
				viewportWidth: 1024,
				viewportHeight: 800
			},
			1
		) );
	} );

	it( 'maps other reasons to legacy event without tracking', () => {
		const legacyEvent = mapNotShownEvent(
			new NotShownEvent( { reason: BannerNotShownReasons.DisallowedNamespace } )
		);

		expect( legacyEvent ).toStrictEqual(
			new WMDELegacyBannerEvent( 'namespace_tracking', 0 )
		);
	} );

	it( 'maps new reasons to legacy event with unknown name', () => {
		const legacyEvent = mapNotShownEvent(
			new NotShownEvent( { reason: 'moon_is_in_the_second_house' } )
		);

		expect( legacyEvent ).toStrictEqual(
			new WMDELegacyBannerEvent( DEFAULT_UNKNOWN_EVENT, 0 )
		);
	} );

	it( 'maps events with missing reason to legacy event with unknown name', () => {
		const legacyEvent = mapNotShownEvent(
			new NotShownEvent( { } )
		);

		expect( legacyEvent ).toStrictEqual(
			new WMDELegacyBannerEvent( DEFAULT_UNKNOWN_EVENT, 0 )
		);
	} );

} );
