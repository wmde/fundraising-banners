import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import type { Tracker } from '@src/tracking/Tracker';
import { ClickedDonateLink } from '@src/tracking/events/ClickedDonateLink';

export class DonateLinkPopupState extends BannerState {
	public readonly stateName: BannerStates = BannerStates.DonateLinkPopup;
	private _page: Page;
	private _messages: {
		linkMessage: string;
		menuMessage: string;
	};
	private _tracker: Tracker;

	public constructor(
		page: Page,
		messages: {
			linkMessage: string;
			menuMessage: string;
		},
		tracker: Tracker
	) {
		super();
		this._page = page;
		this._messages = messages;
		this._tracker = tracker;
	}

	public enter(): Promise<any> {
		return this._page.showDonateLinkTooltip( this._messages, this.onClick.bind( this ) );
	}

	public exit(): Promise<any> {
		throw new Error( 'This state will never be exited' );
	}

	private onClick(): void {
		this._tracker.trackEvent( new ClickedDonateLink() );
	}
}
