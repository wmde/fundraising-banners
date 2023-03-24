export interface ResizeHandler {
	onResize( resizeCallback: () => void ): void;
	onClose(): void
}

export class WindowResizeHandler implements ResizeHandler {
	private _resizeCallback: () => void;
	private readonly _referencedResizeCallback: () => void;

	public constructor() {
		this._referencedResizeCallback = (): void => this._resizeCallback();
		window.addEventListener( 'resize', this._referencedResizeCallback );
	}

	public onResize( resizeCallback: () => void ): void {
		this._resizeCallback = resizeCallback;
	}

	public onClose(): void {
		window.removeEventListener( 'resize', this._referencedResizeCallback );
	}
}
