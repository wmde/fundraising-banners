import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';

export class BannerStateStub extends BannerState {
	public readonly stateName: BannerStates = BannerStates.Initial;
	public canMoveToStates: BannerStates[] = [
		BannerStates.Initial,
		BannerStates.Pending,
		BannerStates.NotShown,
		BannerStates.Showing,
		BannerStates.Visible,
		BannerStates.Closed
	];
	public wasEntered: boolean = false;
	public wasExited: boolean = false;
	public resizedTo: number[] = [];
	public contentChangedTo: number[] = [];

	public enter(): Promise<any> {
		this.wasEntered = true;
		return Promise.resolve( true );
	}

	public exit(): Promise<any> {
		this.wasExited = true;
		return Promise.resolve( true );
	}

	public onResize( space: number ): void {
		this.resizedTo.push( space );
	}

	public onContentChanged( space: number ): void {
		this.contentChangedTo.push( space );
	}
}
