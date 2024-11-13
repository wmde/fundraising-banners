export interface Timer {
	setTimeout( fn: () => void, after: number ): number;
	clearTimeout( id: number ): void;
	setInterval( fn: () => void, after: number ): number;
	clearInterval( id: number ): void;
	clearAll(): void;
	nextTick( fn: () => void ): void;
}

export class WindowTimer implements Timer {
	private _intervals: number[] = [];
	private _timers: number[] = [];

	public setInterval( fn: () => void, after: number ): number {
		const interval = window.setInterval( fn, after );
		this._intervals.push( interval );
		return interval;
	}

	public setTimeout( fn: () => void, after: number ): number {
		const timer = window.setTimeout( fn, after );
		this._timers.push( timer );
		return timer;
	}

	public clearAll(): void {
		this._intervals.forEach( id => window.clearInterval( id ) );
		this._timers.forEach( id => window.clearTimeout( id ) );
		this._intervals = [];
		this._timers = [];
	}

	public clearInterval( id: number ): void {
		const index = this._intervals.indexOf( id );
		if ( index === -1 ) {
			return;
		}

		window.clearInterval( id );
		this._intervals.splice( index, 1 );
	}

	public clearTimeout( id: number ): void {
		const index = this._timers.indexOf( id );
		if ( index === -1 ) {
			return;
		}

		window.clearTimeout( id );
		this._timers.splice( index, 1 );
	}

	public nextTick( fn: () => void ): void {
		window.setTimeout( fn );
	}
}
