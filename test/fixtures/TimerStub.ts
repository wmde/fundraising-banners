import { Timer } from '@src/utils/Timer';

export class TimerStub implements Timer {
	public clearAll(): void {
	}

	public clearInterval(): void {
	}

	public clearTimeout(): void {
	}

	public setInterval( fn: () => void ): number {
		fn();
		return 0;
	}

	public setTimeout( fn: () => void ): number {
		fn();
		return 0;
	}

	public nextTick( fn: () => void ): void {
		fn();
	}
}
