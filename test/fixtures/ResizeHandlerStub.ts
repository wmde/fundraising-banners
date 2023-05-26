import { ResizeHandler } from '@src/utils/ResizeHandler';

export class ResizeHandlerStub implements ResizeHandler {
	public callOnResize: () => void;

	public onClose(): void {
	}

	public onResize( resizeHandler: () => void ): void {
		this.callOnResize = resizeHandler;
	}
}
