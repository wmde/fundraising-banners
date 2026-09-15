import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';

export class DonateLinkPopupState extends BannerState {
	public readonly stateName: BannerStates = BannerStates.DonateLinkPopup;
	private _page: Page;
	private _message: string;

	public constructor(
		page: Page,
		message: string
	) {
		super();
		this._page = page;
		this._message = message;
	}

	public enter(): Promise<any> {
		return this._page.showDonateLinkTooltip( this._message );
	}

	public exit(): Promise<any> {
		throw new Error( 'This state will never be exited' );
	}

}
