import { describe, expect, it, vi, vitest } from 'vitest';
import { DonateLinkPopupState } from '@src/components/BannerConductor/StateMachine/states/DonateLinkPopupState';
import { PageStub } from '@test/fixtures/PageStub';
import { TrackerStub } from '@test/fixtures/TrackerStub';
import { Page } from '@src/page/Page';
import { ClickedDonateLink } from '@src/tracking/events/ClickedDonateLink';

describe( 'ClosedState', () => {
	it( 'shows the popup link on enter', async () => {
		const page = new PageStub();
		page.showDonateLinkTooltip = vi.fn();
		const message = { linkMessage: 'link Message', menuMessage: 'menu message' };
		const state = new DonateLinkPopupState( page, message, new TrackerStub() );

		await state.enter();

		expect( page.showDonateLinkTooltip ).toHaveBeenCalledWith( message, expect.any( Function ) );
	} );

	it( 'tracks an event when the popup link is clicked', async () => {
		let callback: () => void;
		const tracker = { trackEvent: vitest.fn() };
		const page = {
			showDonateLinkTooltip: async ( messages: any, clickCallback: () => void ): Promise<void> => {
				callback = clickCallback;
			}
		} as any as Page;

		const state = new DonateLinkPopupState( page, { linkMessage: '', menuMessage: '' }, tracker );

		await state.enter();
		callback();

		expect( tracker.trackEvent ).toHaveBeenCalledWith( new ClickedDonateLink() );
	} );
} );
