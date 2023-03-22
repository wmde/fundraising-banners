export interface ResizeHandler {
	onResize( resizeCallback: () => void ): void;
	onClose(): void
}

export class WindowResizeHandler implements ResizeHandler {
	private resizeCallback: () => void;
	private readonly referencedResizeCallback: () => void;

	public constructor() {
		this.referencedResizeCallback = (): void => this.resizeCallback();
		window.addEventListener( 'resize', this.referencedResizeCallback );
	}

	public onResize( resizeCallback: () => void ): void {
		this.resizeCallback = resizeCallback;
	}

	public onClose(): void {
		window.removeEventListener( 'resize', this.referencedResizeCallback );
	}
}
