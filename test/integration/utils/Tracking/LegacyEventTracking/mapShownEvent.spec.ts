import { describe, expect, it } from 'vitest';

import { mapShownEvent } from '@src/tracking/LegacyEventTracking/mapShownEvent';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';

describe( 'mapShownEvent', () => {
	it( 'maps shown events to legacy event', () => {
		const legacyEvent = mapShownEvent();

		expect( legacyEvent ).toStrictEqual(
			new WMDELegacyBannerEvent( 'banner-shown', 1 )
		);
	} );
} );
