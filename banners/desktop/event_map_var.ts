import CtrlEventMap from './event_map';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { UpgradeToYearlyEvent } from '@src/tracking/events/UpgradeToYearlyEvent';
import { WMDEBannerEvent } from '@src/tracking/WPORG/WMDEBannerEvent';

// We "extend" the event map here because the original one is still in flux and we want to avoid duplication
// At the next reset of this test, you should either throw away this map or combine the two maps in one file
CtrlEventMap.set( BannerSubmitEvent.EVENT_NAME,
	( e: BannerSubmitEvent ): WMDESizeIssueEvent => {
		return new WMDESizeIssueEvent( `submit`, 0, 0.1 );
	}
);
CtrlEventMap.set( UpgradeToYearlyEvent.EVENT_NAME,
	( e: BannerSubmitEvent ): WMDEBannerEvent => {
		return new WMDEBannerEvent( e.customData.optionSelected, 0.1 );
	}
);

export default CtrlEventMap;
