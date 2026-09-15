import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';

export class DonateLinkPopupState extends BannerState {
	public readonly stateName: BannerStates = BannerStates.DonateLinkPopup;
	private _page: Page;
	private _messages: {
		linkMessage: string;
		menuMessage: string;
	};

	public constructor(
		page: Page,
		messages: {
			linkMessage: string;
			menuMessage: string;
		}
	) {
		super();
		this._page = page;
		this._messages = messages;
	}

	public enter(): Promise<any> {
		return this._page.showDonateLinkTooltip( this._messages );
	}

	public exit(): Promise<any> {
		throw new Error( 'This state will never be exited' );
	}

}
